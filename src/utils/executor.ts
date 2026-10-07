import { TestCase } from '../data/problems';

export interface TestResult {
  index: number;
  input: string;
  expected: string;
  actual?: string;
  passed: boolean;
  error?: string;
  hidden: boolean;
  time?: string;
  memory?: number;
}

export interface ExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
  stderr?: string;
  compile_output?: string;
  time?: string;
  memory?: number;
  status?: string;
  exit_code?: number;
  exit_signal?: number;
}

export interface CompilerOptions {
  standard?: string;
}

const encodeBase64 = (str: string) => {
  try {
    return btoa(unescape(encodeURIComponent(str || '')));
  } catch (e) {
    return btoa(str || '');
  }
};

const decodeBase64 = (str: string | null) => {
  if (!str) return '';
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch (e) {
    return atob(str);
  }
};


const matchOutput = (actual: string, expected: string, matchType?: 'exact' | 'numeric' | 'regex' | 'normalized') => {
  if (!actual) actual = "";
  if (!expected) expected = "";

  // Integrity: empty/whitespace-only program output must never match a
  // non-empty expected output, regardless of match mode. (In regex mode a
  // pattern like ".*" would otherwise test true against empty output.)
  if (actual.trim() === '' && expected.trim() !== '') {
    return false;
  }

  if (matchType === 'exact') {
    return actual === expected;
  }
  
  if (matchType === 'numeric') {
    const actualNums = actual.match(/-?\d+(\.\d+)?/g) || [];
    const expectedNums = expected.match(/-?\d+(\.\d+)?/g) || [];
    if (actualNums.length !== expectedNums.length || expectedNums.length === 0) {
      // Fallback to normalized if numeric fails finding numbers
      if (expectedNums.length === 0) return actual.trim().replace(/\s+/g, ' ') === expected.trim().replace(/\s+/g, ' ');
      return false;
    }
    for (let i = 0; i < actualNums.length; i++) {
      if (Math.abs(parseFloat(actualNums[i]) - parseFloat(expectedNums[i])) > 0.0001) return false;
    }
    return true;
  }
  
  if (matchType === 'regex') {
    const trimmedActual = actual.trim();
    const trimmedExpected = expected.trim();
    if (trimmedActual === trimmedExpected) {
      return true;
    }
    try {
      const regex = new RegExp(trimmedExpected);
      return regex.test(trimmedActual);
    } catch {
      return false;
    }
  }
  
  // Default: normalized string matching (ignores extra spaces and newlines)
  const normActual = actual.trim().replace(/\s+/g, ' ');
  const normExpected = expected.trim().replace(/\s+/g, ' ');
  return normActual === normExpected;
};

const getCompilerOptionsString = (options?: CompilerOptions) => {
  let opts = '-lm';
  if (options?.standard) {
    opts += ` -std=${options.standard}`;
  }
  return opts;
};

const JUDGE0_TIMEOUT_MS = 30000;
const OVERALL_TIMEOUT_MS = 120000; // 120s total cap across all test cases
const MAX_SUBMIT_ATTEMPTS = 4; // initial try + 3 retries on rate-limit / transient errors

async function fetchJudge0WithTimeout(url: string, init: RequestInit, timeoutMs = JUDGE0_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal
    });
    return response;
  } catch (err: any) {
    if (err?.name === 'AbortError' || controller.signal.aborted) {
      throw new Error('Code execution timed out (30s limit exceeded). The Judge0 server did not respond in time.');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// POST a submission with exponential backoff on 429 / 5xx. ce.judge0.com is a
// shared public instance — bursts from a classroom can trip its rate limiter.
async function postSubmissionWithRetry(body: string): Promise<Response> {
  let lastErr: any = null;
  for (let attempt = 1; attempt <= MAX_SUBMIT_ATTEMPTS; attempt++) {
    try {
      const response = await fetchJudge0WithTimeout('https://ce.judge0.com/submissions?base64_encoded=true&wait=true', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      if (response.status === 429 || (response.status >= 500 && response.status < 600)) {
        lastErr = new Error(
          response.status === 429
            ? 'Execution server is busy (rate limit). Retrying…'
            : `Execution server error (${response.status}). Retrying…`
        );
      } else if (!response.ok) {
        throw new Error(`Failed to connect to execution server (HTTP ${response.status}).`);
      } else {
        return response;
      }
    } catch (err: any) {
      // Network errors / timeouts are also worth one retry cycle
      if (attempt >= MAX_SUBMIT_ATTEMPTS) throw err;
      lastErr = err;
    }
    if (attempt < MAX_SUBMIT_ATTEMPTS) {
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt - 1))); // 1s, 2s, 4s
    }
  }
  // Retries exhausted — surface a human-readable rate-limit message when that's the cause.
  if (lastErr?.message?.includes('rate limit')) {
    throw new Error('Execution server is busy right now (too many requests). Please wait about 30 seconds and try again.');
  }
  throw lastErr || new Error('Failed to connect to execution server');
}

export const executeCode = async (
  code: string,
  functionName: string,
  testCases: TestCase[],
  options?: CompilerOptions
): Promise<{ success: boolean; results?: TestResult[]; error?: string }> => {
  try {
    const results: TestResult[] = [];
    const compiler_options = getCompilerOptionsString(options);
    const overallStartTime = Date.now();
    
    // Process test cases one by one to avoid rate limiting
    for (let i = 0; i < testCases.length; i++) {
      // Enforce overall 120s timeout cap across all test cases
      if (Date.now() - overallStartTime > OVERALL_TIMEOUT_MS) {
        const timeoutMsg = 'Overall time limit exceeded (120s limit reached across test cases).';
        for (let j = i; j < testCases.length; j++) {
          results.push({
            index: j,
            input: testCases[j].input,
            expected: testCases[j].expected,
            passed: false,
            error: timeoutMsg,
            hidden: testCases[j].hidden,
          });
        }
        break;
      }

      const tc = testCases[i];

      const response = await postSubmissionWithRetry(JSON.stringify({
        language_id: 50, // C (GCC 9.2.0)
        compiler_options,
        source_code: encodeBase64(code),
        stdin: encodeBase64(tc.input),
      }));

      const data = await response.json();
      
      if (data.status.id !== 3) {
        const rawCompileErr = decodeBase64(data.compile_output).trim();
        const rawStderr = decodeBase64(data.stderr).trim();
        const errorMsg = rawCompileErr || rawStderr || data.status.description || 'Compilation Error';
        
        results.push({
          index: i,
          input: tc.input,
          expected: tc.expected,
          passed: false,
          error: errorMsg,
          hidden: tc.hidden,
          time: data.time,
          memory: data.memory,
        });

        // When a submission returns a compilation error (status.id !== 3), do NOT submit the remaining test cases.
        // Instead, immediately mark every remaining test case as failed with the same compile error message and break out of the loop.
        const isCompileError = data.status.id === 6 || 
          Boolean(rawCompileErr) || 
          data.status.description?.toLowerCase().includes('compil') ||
          (i === 0 && data.status.id !== 4 && data.status.id !== 5);

        if (isCompileError) {
          for (let j = i + 1; j < testCases.length; j++) {
            results.push({
              index: j,
              input: testCases[j].input,
              expected: testCases[j].expected,
              passed: false,
              error: errorMsg,
              hidden: testCases[j].hidden,
            });
          }
          break;
        }
      } else {
        const actualOutput = decodeBase64(data.stdout).trim();
        const expectedOutput = tc.expected.trim();
        
        results.push({
          index: i,
          input: tc.input,
          expected: expectedOutput,
          actual: actualOutput,
          passed: matchOutput(actualOutput, expectedOutput, tc.matchType),
          hidden: tc.hidden,
          time: data.time,
          memory: data.memory,
        });
      }

      // Check overall timeout after each test case completion as well
      if (i < testCases.length - 1 && Date.now() - overallStartTime > OVERALL_TIMEOUT_MS) {
        const timeoutMsg = 'Overall time limit exceeded (120s limit reached across test cases).';
        for (let j = i + 1; j < testCases.length; j++) {
          results.push({
            index: j,
            input: testCases[j].input,
            expected: testCases[j].expected,
            passed: false,
            error: timeoutMsg,
            hidden: testCases[j].hidden,
          });
        }
        break;
      }
    }
    
    return { success: true, results };
  } catch (err: any) {
    return { success: false, error: err.message || 'Execution failed' };
  }
};

export const executeCustomCode = async (code: string, input: string, options?: CompilerOptions): Promise<ExecutionResult> => {
  try {
    const compiler_options = getCompilerOptionsString(options);
    const response = await postSubmissionWithRetry(JSON.stringify({
      language_id: 50, // C (GCC 9.2.0)
      compiler_options,
      source_code: encodeBase64(code),
      stdin: encodeBase64(input),
    }));

    const data = await response.json();
    
    const res: ExecutionResult = {
      success: data.status.id === 3,
      output: decodeBase64(data.stdout),
      stderr: decodeBase64(data.stderr),
      compile_output: decodeBase64(data.compile_output),
      time: data.time,
      memory: data.memory,
      status: data.status?.description,
      exit_code: data.exit_code,
      exit_signal: data.exit_signal
    };
    
    if (data.status.id !== 3) {
      res.error = res.compile_output || res.stderr || data.status.description || 'Compilation Error';
    }
    
    return res;
  } catch (err: any) {
    return { success: false, error: err.message || 'Execution failed' };
  }
};

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
    try {
      const regex = new RegExp(expected.trim());
      return regex.test(actual.trim());
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

export const executeCode = async (
  code: string,
  functionName: string,
  testCases: TestCase[],
  options?: CompilerOptions
): Promise<{ success: boolean; results?: TestResult[]; error?: string }> => {
  try {
    const results: TestResult[] = [];
    const compiler_options = getCompilerOptionsString(options);
    
    // Process test cases one by one to avoid rate limiting
    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      
      const response = await fetchJudge0WithTimeout('https://ce.judge0.com/submissions?base64_encoded=true&wait=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language_id: 50, // C (GCC 9.2.0)
          compiler_options,
          source_code: encodeBase64(code),
          stdin: encodeBase64(tc.input),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to connect to execution server');
      }
      
      const data = await response.json();
      
      if (data.status.id !== 3) {
        const errorMsg = decodeBase64(data.compile_output) || decodeBase64(data.stderr) || data.status.description || 'Compilation Error';
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
    }
    
    return { success: true, results };
  } catch (err: any) {
    return { success: false, error: err.message || 'Execution failed' };
  }
};

export const executeCustomCode = async (code: string, input: string, options?: CompilerOptions): Promise<ExecutionResult> => {
  try {
    const compiler_options = getCompilerOptionsString(options);
    const response = await fetchJudge0WithTimeout('https://ce.judge0.com/submissions?base64_encoded=true&wait=true', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language_id: 50, // C (GCC 9.2.0)
        compiler_options,
        source_code: encodeBase64(code),
        stdin: encodeBase64(input),
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to connect to execution server');
    }
    
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

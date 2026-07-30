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

const getCompilerOptionsString = (options?: CompilerOptions) => {
  let opts = '-lm';
  if (options?.standard) {
    opts += ` -std=${options.standard}`;
  }
  return opts;
};

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
      
      const response = await fetch('https://ce.judge0.com/submissions?base64_encoded=true&wait=true', {
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
          passed: actualOutput === expectedOutput,
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
    const response = await fetch('https://ce.judge0.com/submissions?base64_encoded=true&wait=true', {
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

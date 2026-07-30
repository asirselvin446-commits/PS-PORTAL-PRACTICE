import { TestCase } from '../data/problems';

export interface TestResult {
  index: number;
  input: string;
  expected: string;
  actual?: string;
  passed: boolean;
  error?: string;
  hidden: boolean;
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

export const executeCode = async (
  code: string,
  functionName: string,
  testCases: TestCase[]
): Promise<{ success: boolean; results?: TestResult[]; error?: string }> => {
  try {
    const results: TestResult[] = [];
    
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
          hidden: tc.hidden
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
          hidden: tc.hidden
        });
      }
    }
    
    return { success: true, results };
  } catch (err: any) {
    return { success: false, error: err.message || 'Execution failed' };
  }
};

export const executeCustomCode = async (code: string, input: string): Promise<{ success: boolean; output?: string; error?: string }> => {
  try {
    const response = await fetch('https://ce.judge0.com/submissions?base64_encoded=true&wait=true', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language_id: 50, // C (GCC 9.2.0)
        source_code: encodeBase64(code),
        stdin: encodeBase64(input),
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to connect to execution server');
    }
    
    const data = await response.json();
    
    if (data.status.id !== 3) {
      const errorMsg = decodeBase64(data.compile_output) || decodeBase64(data.stderr) || data.status.description || 'Compilation Error';
      return { success: false, error: errorMsg };
    }
    
    return { success: true, output: decodeBase64(data.stdout) };
  } catch (err: any) {
    return { success: false, error: err.message || 'Execution failed' };
  }
};

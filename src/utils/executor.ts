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
      const response = await fetch('https://wandbox.org/api/compile.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          compiler: 'gcc-head',
          code: code,
          stdin: tc.input,
          save: false
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to connect to execution server');
      }
      
      const data = await response.json();
      
      if (data.status !== "0") {
        results.push({
          index: i,
          input: tc.input,
          expected: tc.expected,
          passed: false,
          error: data.compiler_error || data.program_error || 'Compilation Error',
          hidden: tc.hidden
        });
      } else {
        const actualOutput = (data.program_output || "").trim();
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
    const response = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        compiler: 'gcc-head',
        code: code,
        stdin: input,
        save: false
      }),
    });
      
    if (!response.ok) {
      throw new Error('Failed to connect to execution server');
    }
    
    const data = await response.json();
    
    if (data.status !== "0") {
      return { success: false, error: data.compiler_error || data.program_error || 'Compilation Error' };
    }
    
    return { success: true, output: data.program_output || "" };
  } catch (err: any) {
    return { success: false, error: err.message || 'Execution failed' };
  }
};

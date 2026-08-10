import fs from 'fs';

// 1. Update executor.ts
let executorContent = fs.readFileSync('src/utils/executor.ts', 'utf-8');

const matchOutputFn = `
const matchOutput = (actual: string, expected: string, matchType?: 'exact' | 'numeric' | 'regex' | 'normalized') => {
  if (!actual) actual = "";
  if (!expected) expected = "";
  
  if (matchType === 'exact') {
    return actual === expected;
  }
  
  if (matchType === 'numeric') {
    const actualNums = actual.match(/-?\\d+(\\.\\d+)?/g) || [];
    const expectedNums = expected.match(/-?\\d+(\\.\\d+)?/g) || [];
    if (actualNums.length !== expectedNums.length || expectedNums.length === 0) {
      // Fallback to normalized if numeric fails finding numbers
      if (expectedNums.length === 0) return actual.trim().replace(/\\s+/g, ' ') === expected.trim().replace(/\\s+/g, ' ');
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
  const normActual = actual.trim().replace(/\\s+/g, ' ');
  const normExpected = expected.trim().replace(/\\s+/g, ' ');
  return normActual === normExpected;
};
`;

if (!executorContent.includes("matchOutput =")) {
  executorContent = executorContent.replace(
    /const getCompilerOptionsString/g,
    matchOutputFn + '\nconst getCompilerOptionsString'
  );
}

executorContent = executorContent.replace(
  /const actualOutput = decodeBase64\(data\.stdout\)\.trim\(\);\s*const expectedOutput = tc\.expected\.trim\(\);\s*results\.push\(\{\s*index: i,\s*input: tc\.input,\s*expected: expectedOutput,\s*actual: actualOutput,\s*passed: actualOutput === expectedOutput,/g,
  `const actualOutput = decodeBase64(data.stdout).trim();
        const expectedOutput = tc.expected.trim();
        
        results.push({
          index: i,
          input: tc.input,
          expected: expectedOutput,
          actual: actualOutput,
          passed: matchOutput(actualOutput, expectedOutput, tc.matchType),`
);

fs.writeFileSync('src/utils/executor.ts', executorContent);

// 2. Update problems.ts
let problemsContent = fs.readFileSync('src/data/problems.ts', 'utf-8');
problemsContent = problemsContent.replace(
  /export interface TestCase \{\s*input: string;\s*expected: string;\s*hidden: boolean;\s*\}/g,
  `export interface TestCase {
  input: string;
  expected: string;
  hidden: boolean;
  matchType?: 'exact' | 'numeric' | 'regex' | 'normalized';
}`
);

// We need to inject matchType: 'normalized' for some problems and 'numeric' for others.
// We can use a regex to update all JSON stringified problems.
// Wait, we can just eval and re-stringify.
const match = problemsContent.match(/export const problems: Problem\[\] = (\[[\s\S]*\]);/);
let problems = eval(match[1]);

problems.forEach(p => {
  // Determine if problem is numeric based on expected output types
  let allNumeric = p.testCases.every(tc => {
    // if expected is only numbers and spaces
    return tc.expected.trim().length > 0 && /^[-\d\s\.]+$/.test(tc.expected.trim());
  });

  p.testCases.forEach(tc => {
    if (p.id === "l2-p1-roman-numeral") {
      tc.matchType = 'normalized'; // they might add extra spaces
    } else if (allNumeric) {
      tc.matchType = 'numeric'; // extract numbers to ignore "Sum is 5" vs "5"
    } else {
      tc.matchType = 'normalized'; // general fallback
    }
  });
});

const newProblemsContent = `export interface TestCase {
  input: string;
  expected: string;
  hidden: boolean;
  matchType?: 'exact' | 'numeric' | 'regex' | 'normalized';
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  level: number;
  description: string;
  functionName: string;
  starterCode: string;
  testCases: TestCase[];
}

export const problems: Problem[] = ${JSON.stringify(problems, null, 2)};
`;

fs.writeFileSync('src/data/problems.ts', newProblemsContent);

console.log("Updated validation logic!");

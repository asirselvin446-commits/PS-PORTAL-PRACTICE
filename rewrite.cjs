const fs = require('fs');

const content = fs.readFileSync('src/data/problems.ts', 'utf8');

let newContent = content;

// Replace findPrimes
newContent = newContent.replace(
  `    functionName: 'findPrimes',\n    starterCode: 'function findPrimes(start, end) {\\n  const primes = [];\\n  // Write your code here\\n  \\n  return primes;\\n}',\n    testCases: [\n      { inputs: [2, 5], expected: [2, 3, 5], hidden: false },\n      { inputs: [10, 20], expected: [11, 13, 17, 19], hidden: false },\n      { inputs: [1, 10], expected: [2, 3, 5, 7], hidden: false },\n      { inputs: [20, 30], expected: [23, 29], hidden: true },\n      { inputs: [100, 120], expected: [101, 103, 107, 109, 113], hidden: true },\n    ],`,
  `    functionName: 'main',\n    starterCode: '#include <stdio.h>\\n\\nint main() {\\n    // Write your code here\\n    \\n    return 0;\\n}',\n    testCases: [\n      { input: "2 5", expected: "2 3 5", hidden: false },\n      { input: "10 20", expected: "11 13 17 19", hidden: false },\n      { input: "1 10", expected: "2 3 5 7", hidden: false },\n      { input: "20 30", expected: "23 29", hidden: true },\n      { input: "100 120", expected: "101 103 107 109 113", hidden: true },\n    ],`
);

// Replace isHarshad
newContent = newContent.replace(
  `    functionName: 'isHarshad',\n    starterCode: 'function isHarshad(n) {\\n  // Write your code here\\n  \\n}',\n    testCases: [\n      { inputs: [36], expected: true, hidden: false },\n      { inputs: [15], expected: false, hidden: false },\n      { inputs: [18], expected: true, hidden: false },\n      { inputs: [19], expected: false, hidden: true },\n      { inputs: [100], expected: true, hidden: true },\n    ],`,
  `    functionName: 'main',\n    starterCode: '#include <stdio.h>\\n\\nint main() {\\n    // Write your code here\\n    \\n    return 0;\\n}',\n    testCases: [\n      { input: "36", expected: "36 is a Harshad Number", hidden: false },\n      { input: "15", expected: "15 is not a Harshad Number", hidden: false },\n      { input: "18", expected: "18 is a Harshad Number", hidden: false },\n      { input: "19", expected: "19 is not a Harshad Number", hidden: true },\n      { input: "100", expected: "100 is a Harshad Number", hidden: true },\n    ],`
);

// Replace productOfDigits
newContent = newContent.replace(
  `    functionName: 'productOfDigits',\n    starterCode: 'function productOfDigits(n) {\\n  // Write your code here\\n  \\n}',\n    testCases: [\n      { inputs: [65], expected: 30, hidden: false },\n      { inputs: [123], expected: 6, hidden: false },\n      { inputs: [90], expected: 0, hidden: true },\n      { inputs: [456], expected: 120, hidden: true },\n    ],`,
  `    functionName: 'main',\n    starterCode: '#include <stdio.h>\\n\\nint main() {\\n    // Write your code here\\n    \\n    return 0;\\n}',\n    testCases: [\n      { input: "65", expected: "30", hidden: false },\n      { input: "123", expected: "6", hidden: false },\n      { input: "90", expected: "0", hidden: true },\n      { input: "456", expected: "120", hidden: true },\n    ],`
);

// Replace isStrongNumber
newContent = newContent.replace(
  `    functionName: 'isStrongNumber',\n    starterCode: 'function isStrongNumber(n) {\\n  // Write your code here\\n  \\n}',\n    testCases: [\n      { inputs: [145], expected: true, hidden: false },\n      { inputs: [2], expected: true, hidden: false },\n      { inputs: [10], expected: false, hidden: false },\n      { inputs: [40585], expected: true, hidden: true },\n      { inputs: [150], expected: false, hidden: true },\n    ],`,
  `    functionName: 'main',\n    starterCode: '#include <stdio.h>\\n\\nint main() {\\n    // Write your code here\\n    \\n    return 0;\\n}',\n    testCases: [\n      { input: "145", expected: "145 is a Strong number", hidden: false },\n      { input: "2", expected: "2 is a Strong number", hidden: false },\n      { input: "10", expected: "10 is not a Strong number", hidden: false },\n      { input: "40585", expected: "40585 is a Strong number", hidden: true },\n      { input: "150", expected: "150 is not a Strong number", hidden: true },\n    ],`
);

// Replace isPalindrome
newContent = newContent.replace(
  `    functionName: 'isPalindrome',\n    starterCode: 'function isPalindrome(n) {\\n  // Write your code here\\n  \\n}',\n    testCases: [\n      { inputs: [232], expected: true, hidden: false },\n      { inputs: [123], expected: false, hidden: false },\n      { inputs: [1221], expected: true, hidden: true },\n      { inputs: [10], expected: false, hidden: true },\n    ],`,
  `    functionName: 'main',\n    starterCode: '#include <stdio.h>\\n\\nint main() {\\n    // Write your code here\\n    \\n    return 0;\\n}',\n    testCases: [\n      { input: "232", expected: "232 is a palindrome number", hidden: false },\n      { input: "123", expected: "123 is not a palindrome number", hidden: false },\n      { input: "1221", expected: "1221 is a palindrome number", hidden: true },\n      { input: "10", expected: "10 is not a palindrome number", hidden: true },\n    ],`
);

// Replace isArmstrong
newContent = newContent.replace(
  `    functionName: 'isArmstrong',\n    starterCode: 'function isArmstrong(n) {\\n  // Write your code here\\n  \\n}',\n    testCases: [\n      { inputs: [153], expected: true, hidden: false },\n      { inputs: [370], expected: true, hidden: false },\n      { inputs: [123], expected: false, hidden: false },\n      { inputs: [9474], expected: true, hidden: true },\n      { inputs: [9475], expected: false, hidden: true },\n    ],`,
  `    functionName: 'main',\n    starterCode: '#include <stdio.h>\\n\\nint main() {\\n    // Write your code here\\n    \\n    return 0;\\n}',\n    testCases: [\n      { input: "153", expected: "153 is a armstrong number", hidden: false },\n      { input: "370", expected: "370 is a armstrong number", hidden: false },\n      { input: "123", expected: "123 is not a armstrong number", hidden: false },\n      { input: "9474", expected: "9474 is a armstrong number", hidden: true },\n      { input: "9475", expected: "9475 is not a armstrong number", hidden: true },\n    ],`
);

// Replace findTwinPrimes
newContent = newContent.replace(
  `    functionName: 'findTwinPrimes',\n    starterCode: 'function findTwinPrimes(start, end) {\\n  const twins = [];\\n  // Write your code here\\n  \\n  return twins;\\n}',\n    testCases: [\n      { inputs: [1, 20], expected: [[3, 5], [5, 7], [11, 13], [17, 19]], hidden: false },\n      { inputs: [20, 40], expected: [[29, 31]], hidden: false },\n      { inputs: [40, 50], expected: [[41, 43]], hidden: true },\n      { inputs: [1, 10], expected: [[3, 5], [5, 7]], hidden: true },\n    ],`,
  `    functionName: 'main',\n    starterCode: '#include <stdio.h>\\n\\nint main() {\\n    // Write your code here\\n    \\n    return 0;\\n}',\n    testCases: [\n      { input: "1 20", expected: "(3 5 )\\n(5 7 )\\n(11 13 )\\n(17 19 )\\n", hidden: false },\n      { input: "20 40", expected: "(29 31 )\\n", hidden: false },\n      { input: "40 50", expected: "(41 43 )\\n", hidden: true },\n      { input: "1 10", expected: "(3 5 )\\n(5 7 )\\n", hidden: true },\n    ],`
);

// Replace changeCase
newContent = newContent.replace(
  `    functionName: 'changeCase',\n    starterCode: 'function changeCase(char) {\\n  // Write your code here\\n  \\n}',\n    testCases: [\n      { inputs: ["A"], expected: "a", hidden: false },\n      { inputs: ["b"], expected: "B", hidden: false },\n      { inputs: ["$"], expected: "It is not a alphabet", hidden: false },\n      { inputs: ["Z"], expected: "z", hidden: true },\n      { inputs: ["9"], expected: "It is not a alphabet", hidden: true },\n    ],`,
  `    functionName: 'main',\n    starterCode: '#include <stdio.h>\\n\\nint main() {\\n    // Write your code here\\n    \\n    return 0;\\n}',\n    testCases: [\n      { input: "A", expected: "a", hidden: false },\n      { input: "b", expected: "B", hidden: false },\n      { input: "$", expected: "It is not a alphabet", hidden: false },\n      { input: "Z", expected: "z", hidden: true },\n      { input: "9", expected: "It is not a alphabet", hidden: true },\n    ],`
);

// Replace printPattern
newContent = newContent.replace(
  `    functionName: 'printPattern',\n    starterCode: 'function printPattern(n) {\\n  let pattern = "";\\n  // Write your code here using nested loops\\n  \\n  return pattern;\\n}',\n    testCases: [\n      { inputs: [3], expected: "* \\n* * \\n* * * \\n", hidden: false },\n      { inputs: [5], expected: "* \\n* * \\n* * * \\n* * * * \\n* * * * * \\n", hidden: false },\n      { inputs: [1], expected: "* \\n", hidden: true },\n      { inputs: [2], expected: "* \\n* * \\n", hidden: true },\n    ],`,
  `    functionName: 'main',\n    starterCode: '#include <stdio.h>\\n\\nint main() {\\n    // Write your code here\\n    \\n    return 0;\\n}',\n    testCases: [\n      { input: "3", expected: "* \\n* * \\n* * * \\n", hidden: false },\n      { input: "5", expected: "* \\n* * \\n* * * \\n* * * * \\n* * * * * \\n", hidden: false },\n      { input: "1", expected: "* \\n", hidden: true },\n      { input: "2", expected: "* \\n* * \\n", hidden: true },\n    ],`
);


// Replace sumOfDigits
newContent = newContent.replace(
  `    functionName: 'sumOfDigits',\n    starterCode: 'function sumOfDigits(n) {\\n  let sum = 0;\\n  // Write your code here\\n  \\n  return sum;\\n}',\n    testCases: [\n      { inputs: [231456], expected: 21, hidden: false },\n      { inputs: [123], expected: 6, hidden: false },\n      { inputs: [9090], expected: 18, hidden: true },\n      { inputs: [5], expected: 5, hidden: true },\n    ],`,
  `    functionName: 'main',\n    starterCode: '#include <stdio.h>\\n\\nint main() {\\n    // Write your code here\\n    \\n    return 0;\\n}',\n    testCases: [\n      { input: "231456", expected: "21", hidden: false },\n      { input: "123", expected: "6", hidden: false },\n      { input: "9090", expected: "18", hidden: true },\n      { input: "5", expected: "5", hidden: true },\n    ],`
);

fs.writeFileSync('src/data/problems.ts', newContent);

const fs = require('fs');
const content = fs.readFileSync('src/data/problems.ts', 'utf-8');

// I will parse this file and log the tests
const regex = /id:\s*'([^']+)'[\s\S]*?description:\s*`([\s\S]*?)`[\s\S]*?testCases:\s*\[([\s\S]*?)\]/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(`\n--- Problem: ${match[1]} ---`);
  console.log(match[2].trim());
  const tcsStr = match[3];
  const tcRegex = /input:\s*"([^"]*)",\s*expected:\s*"([^"]*)"/g;
  let tcMatch;
  while ((tcMatch = tcRegex.exec(tcsStr)) !== null) {
    console.log(`Input: ${tcMatch[1]} | Expected: ${tcMatch[2]}`);
  }
}

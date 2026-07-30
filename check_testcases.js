import fs from 'fs';

const content = fs.readFileSync('src/data/problems.ts', 'utf-8');
const problemsMatches = [...content.matchAll(/id:\s*'([^']+)'[\s\S]*?testCases:\s*\[([\s\S]*?)\]/g)];

let allGood = true;

for (const match of problemsMatches) {
  const id = match[1];
  const testCasesStr = match[2];
  
  const tcMatches = [...testCasesStr.matchAll(/input:\s*"([^"]*)",\s*expected:\s*"([^"]*)"(?:,\s*hidden:\s*(true|false))?/g)];
  
  if (tcMatches.length !== 6) {
    console.log(`Problem ${id} has ${tcMatches.length} test cases!`);
    allGood = false;
  }
  
  let hiddenCount = 0;
  let visibleCount = 0;
  
  for (const tc of tcMatches) {
    if (tc[3] === 'true') hiddenCount++;
    if (tc[3] === 'false') visibleCount++;
  }
  
  if (visibleCount !== 1 || hiddenCount !== 5) {
    console.log(`Problem ${id} has ${visibleCount} visible and ${hiddenCount} hidden test cases!`);
    allGood = false;
  }
}

if (allGood) console.log("All problems have 1 visible and 5 hidden test cases.");

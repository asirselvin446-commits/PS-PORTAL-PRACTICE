import fs from 'fs';
let content = fs.readFileSync('src/data/problems.ts', 'utf-8');
const match = content.match(/export const problems: Problem\[\] = (\[[\s\S]*\]);/);
if (match) {
  const problems = eval(match[1]);
  problems.forEach(p => {
    console.log(`${p.title}: ${p.testCases.length} test cases`);
  });
} else {
  console.log("No match");
}

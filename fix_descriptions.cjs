const fs = require('fs');

let content = fs.readFileSync('src/data/problems.ts', 'utf-8');

const problemsMatches = [...content.matchAll(/id:\s*'([^']+)'[\s\S]*?description:\s*`([\s\S]*?)`,\s*functionName:[\s\S]*?testCases:\s*\[([\s\S]*?)\]/g)];

for (const match of problemsMatches) {
  const fullMatch = match[0];
  const id = match[1];
  let description = match[2];
  const testCasesStr = match[3];
  
  // Extract test cases using a simple regex since they look like { input: "...", expected: "...", hidden: false }
  const tcMatches = [...testCasesStr.matchAll(/input:\s*"([^"]+)",\s*expected:\s*"([^"]+)"/g)];
  
  // Remove existing Example or Sample Input sections from description
  description = description.replace(/<br\s*\/>\s*<p><strong>(?:Example|Sample Input) 1:[\s\S]*/, '');
  
  // Clean up any trailing spaces or newlines
  description = description.trim();
  
  // Generate new Sample Input/Output based on test cases (take up to 2 visible)
  let samples = '';
  let sampleCount = 1;
  for (const tc of tcMatches) {
    if (sampleCount > 2) break; // Maximum 2 samples
    
    // unescape \n inside the matched strings
    const input = tc[1].replace(/\\n/g, '\n');
    const expected = tc[2].replace(/\\n/g, '\n');
    
    samples += `\n      <br/>\n      <p><strong>Sample Input ${sampleCount}:</strong></p>\n      <pre>${input}</pre>\n      <p><strong>Sample Output ${sampleCount}:</strong></p>\n      <pre>${expected}</pre>`;
    sampleCount++;
  }
  
  const newDescription = description + samples + '\n    ';
  
  // Replace the description in the full match
  const newFullMatch = fullMatch.replace(/description:\s*`[\s\S]*?`,/, `description: \`\n      ${newDescription}\`,`);
  
  // Update content
  content = content.replace(fullMatch, newFullMatch);
}

fs.writeFileSync('src/data/problems.ts', content);
console.log('Updated descriptions!');

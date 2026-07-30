const fs = require('fs');

let content = fs.readFileSync('src/data/problems.ts', 'utf-8');

// We'll replace all existing example sections to unify them.
// First, strip out anything from <br />\s*<p><strong>Example 1: to the end of the description.
// Also strip <br/>\s*<p><strong>Sample Input 1:

content = content.replace(/(description:\s*`[\s\S]*?)(<br\s*\/>\s*<p><strong>(?:Example|Sample Input) 1:[\s\S]*?)(\s*`,)/g, '$1$3');

// Oh wait, I also need the testcases to append the sample inputs.
// Let's use a smarter approach: we can use the TypeScript compiler API, or just regex.

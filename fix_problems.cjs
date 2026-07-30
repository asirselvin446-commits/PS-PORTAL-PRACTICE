const fs = require('fs');

let content = fs.readFileSync('src/data/problems.ts', 'utf8');

// Update interface
content = content.replace(
  "difficulty: 'Easy' | 'Medium' | 'Hard';",
  "difficulty: 'Easy' | 'Medium' | 'Hard';\n  level: number;"
);

// Add level: 2 to existing problems
content = content.replace(/difficulty: '(.+?)',/g, "difficulty: '$1',\n    level: 2,");

fs.writeFileSync('src/data/problems.ts', content);

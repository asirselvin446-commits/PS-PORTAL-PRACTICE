const fs = require('fs');

let content = fs.readFileSync('src/data/problems.ts', 'utf-8');

content = content.replace('greater than 21 and', 'greater than or equal to 21 and');
content = content.replace('greater than 71 and', 'greater than or equal to 71 and');
content = content.replace('greater than 96 and', 'greater than or equal to 96 and');

fs.writeFileSync('src/data/problems.ts', content);

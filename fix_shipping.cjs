const fs = require('fs');
let content = fs.readFileSync('src/data/problems.ts', 'utf-8');
content = content.replace('Handle the Negative value as "Invalid Amount."', 'Handle 0 or negative values as "Invalid Amount."');
fs.writeFileSync('src/data/problems.ts', content);

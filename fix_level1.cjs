const fs = require('fs');

const content = fs.readFileSync('src/data/problems.ts', 'utf-8');
const lines = content.split('\n');

let levelCount = 1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"level": 1')) {
    // We need to look back a few lines to find the title
    for (let j = i; j >= i - 5; j--) {
      if (lines[j].includes('"title":')) {
        let titleMatch = lines[j].match(/"title": "(.*?)"/);
        if (titleMatch) {
          let originalTitle = titleMatch[1];
          // Strip existing numbers at the beginning like "1. ", "12. ", etc
          let newTitleText = originalTitle.replace(/^\d+\.\s*/, '');
          let newTitle = `${levelCount}. ${newTitleText}`;
          lines[j] = lines[j].replace(originalTitle, newTitle);
          levelCount++;
        }
        break;
      }
    }
  }
}

fs.writeFileSync('src/data/problems.ts', lines.join('\n'));

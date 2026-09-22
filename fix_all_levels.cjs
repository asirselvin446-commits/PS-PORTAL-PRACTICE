const fs = require('fs');

const content = fs.readFileSync('src/data/problems.ts', 'utf-8');
const lines = content.split('\n');

const levelCounts = {};

for (let i = 0; i < lines.length; i++) {
  let levelMatch = lines[i].match(/"level":\s*(\d+)/);
  if (levelMatch) {
    let level = parseInt(levelMatch[1]);
    if (!levelCounts[level]) levelCounts[level] = 1;
    
    // We need to look back a few lines to find the title
    for (let j = i; j >= i - 5; j--) {
      if (lines[j].includes('"title":')) {
        let titleMatch = lines[j].match(/"title": "(.*?)"/);
        if (titleMatch) {
          let originalTitle = titleMatch[1];
          // Strip existing numbers at the beginning like "1. ", "12. ", etc
          let newTitleText = originalTitle.replace(/^\d+\.\s*/, '');
          let newTitle = `${levelCounts[level]}. ${newTitleText}`;
          lines[j] = lines[j].replace(originalTitle, newTitle);
          levelCounts[level]++;
        }
        break;
      }
    }
  }
}

fs.writeFileSync('src/data/problems.ts', lines.join('\n'));

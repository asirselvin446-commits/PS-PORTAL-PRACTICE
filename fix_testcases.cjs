const fs = require('fs');

let content = fs.readFileSync('src/data/problems.ts', 'utf-8');

function updateTestCases(id, newTcs) {
  const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?testCases:\\s*\\[)([\\s\\S]*?)(\\])`, 'g');
  content = content.replace(regex, (match, p1, p2, p3) => {
    let tcsStr = '';
    for(let i=0; i<6; i++) {
      tcsStr += `\n      { input: "${newTcs[i].input}", expected: "${newTcs[i].expected}", hidden: ${i === 0 ? 'false' : 'true'} },`;
    }
    tcsStr += '\n    ';
    return p1 + tcsStr + p3;
  });
}

// Fix train-speed
updateTestCases('train-speed', [
  { input: "150\\n2", expected: "75.00\\nAverage speed" },
  { input: "200\\n5", expected: "40.00\\nVery slow" },
  { input: "300\\n2", expected: "150.00\\nOver speed" },
  { input: "120\\n2", expected: "60.00\\nAverage speed" }, // fixed
  { input: "240\\n2", expected: "120.00\\nAverage speed" }, // fixed
  { input: "50\\n1", expected: "50.00\\nAverage speed" } // fixed
]);

fs.writeFileSync('src/data/problems.ts', content);

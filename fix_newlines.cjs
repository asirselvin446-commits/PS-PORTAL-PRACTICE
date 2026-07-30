const fs = require('fs');
const content = fs.readFileSync('src/data/problems.ts', 'utf8');

// Replace escaped newlines with actual newlines in starterCode
const newContent = content.replace(/starterCode: '#include <stdio\.h>\\\\n\\\\nint main\(\) \{\\\\n    \/\/ Write your code here\\\\n    \\\\n    return 0;\\\\n}'/g, 
"starterCode: '#include <stdio.h>\\n\\nint main() {\\n    // Write your code here\\n    \\n    return 0;\\n}'");

fs.writeFileSync('src/data/problems.ts', newContent);

import fs from 'fs';

let content = fs.readFileSync('src/data/problems.ts', 'utf-8');

// There are probably multiple "];" at the end. We need to extract all objects from it or just run a script to parse it and stringify it.
// Wait, the file is valid TS, we can import it.

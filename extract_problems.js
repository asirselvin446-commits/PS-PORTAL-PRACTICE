import fs from 'fs';

// Read problems.ts
let content = fs.readFileSync('src/data/problems.ts', 'utf-8');

// Use a simple extraction: find "export const problems: Problem[] = ["
let startIndex = content.indexOf('export const problems: Problem[] = [');
if(startIndex === -1) {
    startIndex = content.indexOf('export const problems = [');
}
if(startIndex === -1) {
    console.error("Could not find problems array");
    process.exit(1);
}

let arrayStart = content.indexOf('[', startIndex);
let problemsStr = content.substring(arrayStart);

// It's a JS array, we can evaluate it if we stub out the types, or just use regex.
// Since it's TS, maybe we can strip types.
// A simpler way: compile it using tsc or esbuild then run it.

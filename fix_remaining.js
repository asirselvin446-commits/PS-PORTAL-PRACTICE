import fs from 'fs';
let content = fs.readFileSync('src/data/problems.ts', 'utf-8');
const match = content.match(/export const problems: Problem\[\] = (\[[\s\S]*\]);/);
const problems = eval(match[1]);

// 1. Attendance percentage of a student
let p = problems.find(x => x.title === "Attendance percentage of a student");
p.testCases = [
  { input: "100\n75\nY", expected: "75\nAllowed", hidden: false },
  { input: "100\n60\nN", expected: "60\nNot Allowed", hidden: true },
  { input: "100\n90\nN", expected: "90\nAllowed", hidden: true },
  { input: "100\n60\nY", expected: "60\nAllowed", hidden: true },
  { input: "150\n112\nN", expected: "74\nNot Allowed", hidden: true },
  { input: "200\n150\nY", expected: "75\nAllowed", hidden: true }
];

// 2. Employee Gross Salary Calculation
p = problems.find(x => x.title === "Employee Gross Salary Calculation");
p.testCases = [
  { input: "15000", expected: "28500.00", hidden: false },
  { input: "25000", expected: "47500.00", hidden: true }, // >=20000: HRA=30% (7500), DA=95% (23750) => 25000+7500+23750 = 56250? Wait, the problem says:
  { input: "9000", expected: "16200.00", hidden: true },
  { input: "10001", expected: "19001.90", hidden: true }, 
  { input: "30000", expected: "67500.00", hidden: true }, // 30000 + 30000*0.3 + 30000*0.95 = 67500
  { input: "10000", expected: "18000.00", hidden: true }
];
// Wait, I need to make sure the expected output matches the problem description!

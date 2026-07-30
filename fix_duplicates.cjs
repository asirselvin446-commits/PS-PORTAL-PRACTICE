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

// 1. prime-range
updateTestCases('prime-range', [
  { input: "2 5", expected: "2 3 5" },
  { input: "10 20", expected: "11 13 17 19" },
  { input: "1 10", expected: "2 3 5 7" },
  { input: "20 30", expected: "23 29" },
  { input: "100 120", expected: "101 103 107 109 113" },
  { input: "50 60", expected: "53 59" }
]);

// 2. collatz-sequence
updateTestCases('collatz-sequence', [
  { input: "10", expected: "6" },
  { input: "1", expected: "0" },
  { input: "12", expected: "9" },
  { input: "27", expected: "111" },
  { input: "50", expected: "24" },
  { input: "15", expected: "17" }
]);

// 3. harshad-number
updateTestCases('harshad-number', [
  { input: "36", expected: "36 is a harshad number" },
  { input: "15", expected: "15 is not a harshad number" },
  { input: "18", expected: "18 is a harshad number" },
  { input: "19", expected: "19 is not a harshad number" },
  { input: "100", expected: "100 is a harshad number" },
  { input: "21", expected: "21 is a harshad number" }
]);

// 4. product-of-digit
updateTestCases('product-of-digit', [
  { input: "65", expected: "30" },
  { input: "123", expected: "6" },
  { input: "90", expected: "0" },
  { input: "456", expected: "120" },
  { input: "1111", expected: "1" },
  { input: "7", expected: "7" }
]);

// 5. strong-number
updateTestCases('strong-number', [
  { input: "145", expected: "145 is a Strong number" },
  { input: "2", expected: "2 is a Strong number" },
  { input: "10", expected: "10 is not a Strong number" },
  { input: "40585", expected: "40585 is a Strong number" },
  { input: "150", expected: "150 is not a Strong number" },
  { input: "1", expected: "1 is a Strong number" }
]);

// 6. palindrome-number
updateTestCases('palindrome-number', [
  { input: "232", expected: "232 is a palindrome number" },
  { input: "123", expected: "123 is not a palindrome number" },
  { input: "1221", expected: "1221 is a palindrome number" },
  { input: "10", expected: "10 is not a palindrome number" },
  { input: "5", expected: "5 is a palindrome number" },
  { input: "888", expected: "888 is a palindrome number" }
]);

// 7. armstrong-number
updateTestCases('armstrong-number', [
  { input: "153", expected: "153 is a armstrong number" },
  { input: "370", expected: "370 is a armstrong number" },
  { input: "123", expected: "123 is not a armstrong number" },
  { input: "9474", expected: "9474 is a armstrong number" },
  { input: "9475", expected: "9475 is not a armstrong number" },
  { input: "371", expected: "371 is a armstrong number" }
]);

// 8. twin-primes
updateTestCases('twin-primes', [
  { input: "1 20", expected: "(3 5 )\\n(5 7 )\\n(11 13 )\\n(17 19 )\\n" },
  { input: "20 40", expected: "(29 31 )\\n" },
  { input: "40 50", expected: "(41 43 )\\n" },
  { input: "1 10", expected: "(3 5 )\\n(5 7 )\\n" },
  { input: "50 75", expected: "(59 61 )\\n(71 73 )\\n" },
  { input: "10 20", expected: "(11 13 )\\n(17 19 )\\n" }
]);

// 9. working-with-character
updateTestCases('working-with-character', [
  { input: "A", expected: "a" },
  { input: "b", expected: "B" },
  { input: "$", expected: "It is not a alphabet" },
  { input: "Z", expected: "z" },
  { input: "9", expected: "It is not a alphabet" },
  { input: "m", expected: "M" }
]);

// 10. pattern-stars
updateTestCases('pattern-stars', [
  { input: "3", expected: "* \\n* * \\n* * * \\n" },
  { input: "5", expected: "* \\n* * \\n* * * \\n* * * * \\n* * * * * \\n" },
  { input: "1", expected: "* \\n" },
  { input: "2", expected: "* \\n* * \\n" },
  { input: "4", expected: "* \\n* * \\n* * * \\n* * * * \\n" },
  { input: "6", expected: "* \\n* * \\n* * * \\n* * * * \\n* * * * * \\n* * * * * * \\n" }
]);

// 11. sum-of-digits
updateTestCases('sum-of-digits', [
  { input: "231456", expected: "21" },
  { input: "123", expected: "6" },
  { input: "9090", expected: "18" },
  { input: "5", expected: "5" },
  { input: "999", expected: "27" },
  { input: "1000", expected: "1" }
]);

// 12. alphabet-check
updateTestCases('alphabet-check', [
  { input: "T", expected: "T is an Alphabet." },
  { input: "7", expected: "7 is not an Alphabet." },
  { input: "a", expected: "a is an Alphabet." },
  { input: "!", expected: "! is not an Alphabet." },
  { input: "z", expected: "z is an Alphabet." },
  { input: " ", expected: "  is not an Alphabet." }
]);

// 13. number-comparison
updateTestCases('number-comparison', [
  { input: "10\\n5", expected: "10 is greater than 5." },
  { input: "7\\n12", expected: "12 is greater than 7." },
  { input: "8\\n8", expected: "8 is equal to 8." },
  { input: "-5\\n-10", expected: "-5 is greater than -10." },
  { input: "0\\n0", expected: "0 is equal to 0." },
  { input: "-20\\n5", expected: "5 is greater than -20." }
]);

// 14. battery-status
updateTestCases('battery-status', [
  { input: "40", expected: "Medium" },
  { input: "85", expected: "Almost Full" },
  { input: "10", expected: "Low" },
  { input: "100", expected: "Full" },
  { input: "105", expected: "Invalid charge level" },
  { input: "-5", expected: "Invalid charge level" }
]);

// 15. train-speed
updateTestCases('train-speed', [
  { input: "150\\n2", expected: "75.00\\nAverage speed" },
  { input: "200\\n5", expected: "40.00\\nVery slow" },
  { input: "300\\n2", expected: "150.00\\nOver speed" },
  { input: "120\\n2", expected: "60.00\\nVery slow" },
  { input: "240\\n2", expected: "120.00\\nOver speed" },
  { input: "50\\n1", expected: "50.00\\nVery slow" }
]);

// 16. shipping-cost
updateTestCases('shipping-cost', [
  { input: "10", expected: "10.00 Shipping fee is $5." },
  { input: "70", expected: "70.00 Shipping is free." },
  { input: "-5", expected: "Invalid Amount." },
  { input: "50", expected: "50.00 Shipping fee is $5." },
  { input: "100", expected: "100.00 Shipping is free." },
  { input: "0", expected: "Invalid Amount." }
]);

fs.writeFileSync('src/data/problems.ts', content);

export interface TestCase {
  input: string;
  expected: string;
  hidden: boolean;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  level: number;
  description: string;
  functionName: string;
  starterCode: string;
  testCases: TestCase[];
}

export const problems: Problem[] = [
  {
    "id": "prime-range",
    "title": "1. Prime number with ranges",
    "difficulty": "Medium",
    "level": 2,
    "description": "\n      <p>A prime number is a natural number greater than 1 that is not a product of two smaller natural numbers.</p>\n      <p>Write a C program that reads two integers, <code>start</code> and <code>end</code>, and prints all prime numbers between <code>start</code> and <code>end</code> (inclusive), separated by spaces.</p>\n      <p><strong>Note:</strong> You should use a <code>for</code> loop to iterate through the range and check for primality.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>2 5</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>2 3 5</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "2 5",
        "expected": "2 3 5",
        "hidden": false
      },
      {
        "input": "10 20",
        "expected": "11 13 17 19",
        "hidden": true
      },
      {
        "input": "1 10",
        "expected": "2 3 5 7",
        "hidden": true
      },
      {
        "input": "20 30",
        "expected": "23 29",
        "hidden": true
      },
      {
        "input": "100 120",
        "expected": "101 103 107 109 113",
        "hidden": true
      },
      {
        "input": "50 60",
        "expected": "53 59",
        "hidden": true
      }
    ]
  },
  {
    "id": "collatz-sequence",
    "title": "2. Collatz sequence",
    "difficulty": "Medium",
    "level": 2,
    "description": "\n      <p>The Collatz sequence applies to positive integers:</p>\n      <ul>\n        <li>If <em>n</em> is even, divide it by 2.</li>\n        <li>If <em>n</em> is odd, multiply it by 3 and add 1.</li>\n      </ul>\n      <p>Write a C program that reads an integer <code>n</code> and prints the number of steps it takes to reach 1.</p>\n      <p><strong>Note:</strong> This is a great place to practice loops (like <code>while</code> or <code>for</code>) to simulate the sequence!</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>10</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>6</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "10",
        "expected": "6",
        "hidden": false
      },
      {
        "input": "1",
        "expected": "0",
        "hidden": true
      },
      {
        "input": "12",
        "expected": "9",
        "hidden": true
      },
      {
        "input": "27",
        "expected": "111",
        "hidden": true
      },
      {
        "input": "50",
        "expected": "24",
        "hidden": true
      },
      {
        "input": "15",
        "expected": "17",
        "hidden": true
      }
    ]
  },
  {
    "id": "harshad-number",
    "title": "4. Harshad Number",
    "difficulty": "Easy",
    "level": 2,
    "description": "\n      <p>A Harshad number is an integer that is divisible by the sum of its digits.</p>\n      <p>Write a C program that reads a positive integer <code>n</code> and prints whether it is a Harshad number. Output format: \"<code>[n] is a harshad number</code>\" or \"<code>[n] is not a harshad number</code>\".</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>36</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>36 is a harshad number</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "36",
        "expected": "36 is a harshad number",
        "hidden": false
      },
      {
        "input": "15",
        "expected": "15 is not a harshad number",
        "hidden": true
      },
      {
        "input": "18",
        "expected": "18 is a harshad number",
        "hidden": true
      },
      {
        "input": "19",
        "expected": "19 is not a harshad number",
        "hidden": true
      },
      {
        "input": "100",
        "expected": "100 is a harshad number",
        "hidden": true
      },
      {
        "input": "21",
        "expected": "21 is a harshad number",
        "hidden": true
      }
    ]
  },
  {
    "id": "product-of-digit",
    "title": "5. Product of a digit",
    "difficulty": "Easy",
    "level": 2,
    "description": "\n      <p>Write a C program that reads an integer <code>n</code> and prints the product of its digits.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>65</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>30</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "65",
        "expected": "30",
        "hidden": false
      },
      {
        "input": "123",
        "expected": "6",
        "hidden": true
      },
      {
        "input": "90",
        "expected": "0",
        "hidden": true
      },
      {
        "input": "456",
        "expected": "120",
        "hidden": true
      },
      {
        "input": "1111",
        "expected": "1",
        "hidden": true
      },
      {
        "input": "7",
        "expected": "7",
        "hidden": true
      }
    ]
  },
  {
    "id": "strong-number",
    "title": "10. Strong number",
    "difficulty": "Medium",
    "level": 2,
    "description": "\n      <p>A Strong number is a number whose sum of the factorial of its digits is equal to the number itself.</p>\n      <p>Write a C program that reads an integer <code>n</code> and prints whether it is a strong number. Output format: \"<code>[n] is a Strong number</code>\" or \"<code>[n] is not a Strong number</code>\".</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>145</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>145 is a Strong number</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "145",
        "expected": "145 is a Strong number",
        "hidden": false
      },
      {
        "input": "2",
        "expected": "2 is a Strong number",
        "hidden": true
      },
      {
        "input": "10",
        "expected": "10 is not a Strong number",
        "hidden": true
      },
      {
        "input": "40585",
        "expected": "40585 is a Strong number",
        "hidden": true
      },
      {
        "input": "150",
        "expected": "150 is not a Strong number",
        "hidden": true
      },
      {
        "input": "1",
        "expected": "1 is a Strong number",
        "hidden": true
      }
    ]
  },
  {
    "id": "palindrome-number",
    "title": "12. Palindrome or not",
    "difficulty": "Easy",
    "level": 2,
    "description": "\n      <p>A palindrome number reads the same forwards and backwards.</p>\n      <p>Write a C program that reads an integer <code>n</code> and prints whether it is a palindrome. Output format: \"<code>[n] is a palindrome number</code>\" or \"<code>[n] is not a palindrome number</code>\".</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>232</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>232 is a palindrome number</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "232",
        "expected": "232 is a palindrome number",
        "hidden": false
      },
      {
        "input": "123",
        "expected": "123 is not a palindrome number",
        "hidden": true
      },
      {
        "input": "1221",
        "expected": "1221 is a palindrome number",
        "hidden": true
      },
      {
        "input": "10",
        "expected": "10 is not a palindrome number",
        "hidden": true
      },
      {
        "input": "5",
        "expected": "5 is a palindrome number",
        "hidden": true
      },
      {
        "input": "888",
        "expected": "888 is a palindrome number",
        "hidden": true
      }
    ]
  },
  {
    "id": "armstrong-number",
    "title": "13. Armstrong number",
    "difficulty": "Medium",
    "level": 2,
    "description": "\n      <p>An Armstrong number of 3 digits is an integer such that the sum of the cubes of its digits is equal to the number itself. Generalizing, for an n-digit number, the sum of its digits each raised to the power n equals the number.</p>\n      <p>Write a C program that reads an integer <code>n</code> and prints whether it is an Armstrong number. Output format: \"<code>[n] is a armstrong number</code>\" or \"<code>[n] is not a armstrong number</code>\".</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>153</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>153 is a armstrong number</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "153",
        "expected": "153 is a armstrong number",
        "hidden": false
      },
      {
        "input": "370",
        "expected": "370 is a armstrong number",
        "hidden": true
      },
      {
        "input": "123",
        "expected": "123 is not a armstrong number",
        "hidden": true
      },
      {
        "input": "9474",
        "expected": "9474 is a armstrong number",
        "hidden": true
      },
      {
        "input": "9475",
        "expected": "9475 is not a armstrong number",
        "hidden": true
      },
      {
        "input": "371",
        "expected": "371 is a armstrong number",
        "hidden": true
      }
    ]
  },
  {
    "id": "twin-primes",
    "title": "16. Twin Primes",
    "difficulty": "Hard",
    "level": 2,
    "description": "\n      <p>Twin primes are pairs of primes which differ by 2. (e.g., 3 and 5, 11 and 13).</p>\n      <p>Write a C program that reads two integers <code>start</code> and <code>end</code>, and prints twin prime pairs in the given range. Output format for each pair: \"<code>(prime1 prime2 )</code>\" on a new line.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>1 20</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>(3 5 )\n(5 7 )\n(11 13 )\n(17 19 )\n</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "1 20",
        "expected": "(3 5 )\n(5 7 )\n(11 13 )\n(17 19 )\n",
        "hidden": false
      },
      {
        "input": "20 40",
        "expected": "(29 31 )\n",
        "hidden": true
      },
      {
        "input": "40 50",
        "expected": "(41 43 )\n",
        "hidden": true
      },
      {
        "input": "1 10",
        "expected": "(3 5 )\n(5 7 )\n",
        "hidden": true
      },
      {
        "input": "50 75",
        "expected": "(59 61 )\n(71 73 )\n",
        "hidden": true
      },
      {
        "input": "10 20",
        "expected": "(11 13 )\n(17 19 )\n",
        "hidden": true
      }
    ]
  },
  {
    "id": "working-with-character",
    "title": "3. Working with character",
    "difficulty": "Easy",
    "level": 2,
    "description": "\n      <p>Write a C program that reads a single character. If the character is lowercase, it should print its uppercase version. If it is uppercase, it should print its lowercase version. If it is not an alphabet character, print \"It is not a alphabet\".</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>A</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>a</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "A",
        "expected": "a",
        "hidden": false
      },
      {
        "input": "b",
        "expected": "B",
        "hidden": true
      },
      {
        "input": "$",
        "expected": "It is not a alphabet",
        "hidden": true
      },
      {
        "input": "Z",
        "expected": "z",
        "hidden": true
      },
      {
        "input": "9",
        "expected": "It is not a alphabet",
        "hidden": true
      },
      {
        "input": "m",
        "expected": "M",
        "hidden": true
      }
    ]
  },
  {
    "id": "pattern-stars",
    "title": "6. Pattern",
    "difficulty": "Medium",
    "level": 2,
    "description": "\n      <p>Write a C program that reads an integer <code>n</code> and prints a right-angled triangle pattern of stars with <code>n</code> rows. Each row should contain stars separated by a space, and a trailing space at the end of each row.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>3</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>* \n* * \n* * * \n</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "3",
        "expected": "* \n* * \n* * * \n",
        "hidden": false
      },
      {
        "input": "5",
        "expected": "* \n* * \n* * * \n* * * * \n* * * * * \n",
        "hidden": true
      },
      {
        "input": "1",
        "expected": "* \n",
        "hidden": true
      },
      {
        "input": "2",
        "expected": "* \n* * \n",
        "hidden": true
      },
      {
        "input": "4",
        "expected": "* \n* * \n* * * \n* * * * \n",
        "hidden": true
      },
      {
        "input": "6",
        "expected": "* \n* * \n* * * \n* * * * \n* * * * * \n* * * * * * \n",
        "hidden": true
      }
    ]
  },
  {
    "id": "sum-of-digits",
    "title": "14. Sum of a digit",
    "difficulty": "Easy",
    "level": 2,
    "description": "\n      <p>Write a C program that reads a positive integer <code>n</code> and prints the sum of its digits.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>231456</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>21</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "231456",
        "expected": "21",
        "hidden": false
      },
      {
        "input": "123",
        "expected": "6",
        "hidden": true
      },
      {
        "input": "9090",
        "expected": "18",
        "hidden": true
      },
      {
        "input": "5",
        "expected": "5",
        "hidden": true
      },
      {
        "input": "999",
        "expected": "27",
        "hidden": true
      },
      {
        "input": "1000",
        "expected": "1",
        "hidden": true
      }
    ]
  },
  {
    "id": "alphabet-check",
    "title": "1. Alphabet Check",
    "difficulty": "Easy",
    "level": 1,
    "description": "\n      <p>Craft a program to check whether a given character is an alphabet or not. The program should prompt the user to enter a character, then it should determine if the entered character is an alphabet or not.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>T</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>T is an Alphabet.</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "T",
        "expected": "T is an Alphabet.",
        "hidden": false
      },
      {
        "input": "7",
        "expected": "7 is not an Alphabet.",
        "hidden": true
      },
      {
        "input": "a",
        "expected": "a is an Alphabet.",
        "hidden": true
      },
      {
        "input": "!",
        "expected": "! is not an Alphabet.",
        "hidden": true
      },
      {
        "input": "z",
        "expected": "z is an Alphabet.",
        "hidden": true
      },
      {
        "input": " ",
        "expected": "  is not an Alphabet.",
        "hidden": true
      }
    ]
  },
  {
    "id": "number-comparison",
    "title": "2. Number Comparison",
    "difficulty": "Easy",
    "level": 1,
    "description": "\n      <p>Tom, a math teacher, wants to create a simple program to compare two numbers provided by his students. By providing this tool, he aims to help his students understand basic number comparison concepts and improve their problem-solving skills.</p>\n      <p>Craft a program that prompts the user to input two numbers and then determines which one is greater, lesser, or if they are equal.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>10\n5</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>10 is greater than 5.</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "10\n5",
        "expected": "10 is greater than 5.",
        "hidden": false
      },
      {
        "input": "7\n12",
        "expected": "12 is greater than 7.",
        "hidden": true
      },
      {
        "input": "8\n8",
        "expected": "8 is equal to 8.",
        "hidden": true
      },
      {
        "input": "-5\n-10",
        "expected": "-5 is greater than -10.",
        "hidden": true
      },
      {
        "input": "0\n0",
        "expected": "0 is equal to 0.",
        "hidden": true
      },
      {
        "input": "-20\n5",
        "expected": "5 is greater than -20.",
        "hidden": true
      }
    ]
  },
  {
    "id": "battery-status",
    "title": "3. Battery Status Checker",
    "difficulty": "Easy",
    "level": 1,
    "description": "\n      <p>Craft a program that prompts the user to enter an integer and that determines the status of a battery based on its charge level.</p>\n      <p>Determine the status of the battery based on the charge level using statements:</p>\n      <ul>\n        <li>If the charge level is less than or equal to 20, the status is <strong>Low</strong></li>\n        <li>If the charge level is greater than or equal to 21 and less than or equal to 70, the status is <strong>Medium</strong></li>\n        <li>If the charge level is greater than or equal to 71 and less than or equal to 95, the status is <strong>Almost Full</strong></li>\n        <li>If the charge level is greater than or equal to 96 and less than or equal to 100, the status is <strong>Full</strong></li>\n        <li>If the charge level is less than 0 or greater than 100, print <strong>Invalid charge level</strong></li>\n      </ul>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>40</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Medium</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "40",
        "expected": "Medium",
        "hidden": false
      },
      {
        "input": "85",
        "expected": "Almost Full",
        "hidden": true
      },
      {
        "input": "10",
        "expected": "Low",
        "hidden": true
      },
      {
        "input": "100",
        "expected": "Full",
        "hidden": true
      },
      {
        "input": "105",
        "expected": "Invalid charge level",
        "hidden": true
      },
      {
        "input": "-5",
        "expected": "Invalid charge level",
        "hidden": true
      }
    ]
  },
  {
    "id": "train-speed",
    "title": "4. Calculate the speed of the train",
    "difficulty": "Easy",
    "level": 1,
    "description": "\n      <p>Get two inputs:</p>\n      <ul>\n        <li>One to enter the Distance traveled by the train in Kilometers</li>\n        <li>Another is to enter the time taken by the train to cover the above distance (in hours)</li>\n      </ul>\n      <p>Find the speed of the train and display it with 2 decimal places. And comment on the speed by displaying:</p>\n      <ul>\n        <li><strong>Very slow</strong> if speed is less than 50 km/hr</li>\n        <li><strong>Over speed</strong> if speed is greater than 120 km/hr</li>\n        <li><strong>Average speed</strong> if the speed is normal</li>\n      </ul>\n      <p>Hint: speed = distance / time</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>150\n2</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>75.00\nAverage speed</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "150\n2",
        "expected": "75.00\nAverage speed",
        "hidden": false
      },
      {
        "input": "200\n5",
        "expected": "40.00\nVery slow",
        "hidden": true
      },
      {
        "input": "300\n2",
        "expected": "150.00\nOver speed",
        "hidden": true
      },
      {
        "input": "120\n2",
        "expected": "60.00\nAverage speed",
        "hidden": true
      },
      {
        "input": "240\n2",
        "expected": "120.00\nAverage speed",
        "hidden": true
      },
      {
        "input": "50\n1",
        "expected": "50.00\nAverage speed",
        "hidden": true
      }
    ]
  },
  {
    "id": "shipping-cost",
    "title": "5. Calculate Shipping Costs",
    "difficulty": "Easy",
    "level": 1,
    "description": "\n      <p>Imagine you're the lead developer for an online store, tasked with designing a program to calculate shipping costs for orders.</p>\n      <p>The store offers two shipping options: free shipping for orders totaling over $50, and a flat shipping fee of $5 for orders below that threshold.</p>\n      <p>Implement the shipping cost calculation logic. If the order total is over $50, the program should output the order total with 2 decimal places followed by \" Shipping is free.\" Otherwise, it should output the order total with 2 decimal places followed by \" Shipping fee is $5.\" Handle 0 or negative values as \"Invalid Amount.\"</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>10</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>10.00 Shipping fee is $5.</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "10",
        "expected": "10.00 Shipping fee is $5.",
        "hidden": false
      },
      {
        "input": "70",
        "expected": "70.00 Shipping is free.",
        "hidden": true
      },
      {
        "input": "-5",
        "expected": "Invalid Amount.",
        "hidden": true
      },
      {
        "input": "50",
        "expected": "50.00 Shipping fee is $5.",
        "hidden": true
      },
      {
        "input": "100",
        "expected": "100.00 Shipping is free.",
        "hidden": true
      },
      {
        "input": "0",
        "expected": "Invalid Amount.",
        "hidden": true
      }
    ]
  },
  {
    "id": "attendance-percentage",
    "title": "Attendance percentage of a student",
    "difficulty": "Easy",
    "level": 1,
    "description": "\n      <p>The given code is a program that calculates the attendance percentage of a student and checks if the student is eligible to sit for the exam. The program takes two inputs - the total number of hours of classes held and the total number of hours of classes attended by the student. It then calculates the attendance percentage and prints it.</p>\n      <p>If the attendance percentage is 75 or more, it prints <strong>You are allowed to sit in the exam</strong>, otherwise it prints <strong>You are not allowed to sit in the exam</strong>.</p>\n      <p><code>percentage = (total number of hours of classes attended by the student / total number of hours of classes held) * 100</code></p>\n      <p>If the percentage is between 66 (inclusive) to 74 (inclusive), print the message as stated above and then print <strong>Apply for Condonation</strong>.</p>\n      <p>If the percentage is below 66 (excluded), then print the message as stated above and then print <strong>Not eligible for Condonation</strong>.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>100\n80</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>You are allowed to sit in the exam</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>200\n149</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>You are not allowed to sit in the exam\nApply for Condonation</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "100\n75\nY",
        "expected": "75\nAllowed",
        "hidden": false
      },
      {
        "input": "100\n60\nN",
        "expected": "60\nNot Allowed",
        "hidden": true
      },
      {
        "input": "100\n90\nN",
        "expected": "90\nAllowed",
        "hidden": true
      },
      {
        "input": "100\n60\nY",
        "expected": "60\nAllowed",
        "hidden": true
      },
      {
        "input": "150\n112\nN",
        "expected": "74\nNot Allowed",
        "hidden": true
      },
      {
        "input": "200\n150\nY",
        "expected": "75\nAllowed",
        "hidden": true
      }
    ]
  },
  {
    "id": "employee-gross-salary",
    "title": "Employee Gross Salary Calculation",
    "difficulty": "Medium",
    "level": 1,
    "description": "\n      <p>In an employee management system, users input a staff member's basic salary. The program efficiently calculates the Gross salary, incorporating specific allowances based on conditions:</p>\n      <ul>\n        <li>If Basic Salary is <= 10000: HRA = 20%, DA = 80%</li>\n        <li>If Basic Salary is between 10001 to 20000: HRA = 25%, DA = 90%</li>\n        <li>If Basic Salary is >= 20001: HRA = 30%, DA = 95%</li>\n      </ul>\n      <p>This ensures immediate and accurate feedback on the employee's Gross salary within the application. Print the gross salary with 2 decimal places.</p>\n      <p><strong>[Hint: Salary = Basic salary + HRA + DA]</strong></p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>45678</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>102775.50</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "45678",
        "expected": "102775.50",
        "hidden": false
      },
      {
        "input": "22000",
        "expected": "49500.00",
        "hidden": true
      },
      {
        "input": "10000",
        "expected": "20000.00",
        "hidden": true
      },
      {
        "input": "15000",
        "expected": "32250.00",
        "hidden": true
      },
      {
        "input": "20000",
        "expected": "43000.00",
        "hidden": true
      },
      {
        "input": "5000",
        "expected": "10000.00",
        "hidden": true
      }
    ]
  },
  {
    "id": "fitness-challenge",
    "title": "The Fitness Challenge",
    "difficulty": "Easy",
    "level": 1,
    "description": "\n      <p>Craft a program that prompts the user to input the number of steps they took in a day and time (in minutes) taken for the activity. The program should then categorize their fitness level as follows:</p>\n      <ul>\n        <li>Less than 5000 steps: Activity Level - 0</li>\n        <li>5000 to 9999 steps: Activity Level - 25</li>\n        <li>10000 to 14999 steps: Activity Level - 50</li>\n        <li>15000 steps and above: Activity Level - 100</li>\n      </ul>\n      <p>Also predict their activity range = steps / time taken. Print the activity range with two decimal points. Note: Calculate steps / time using integer division before printing as a float.</p>\n      <br/>\n      <p><strong>Sample Input:</strong></p>\n      <pre>11000\n100</pre>\n      <p><strong>Sample Output:</strong></p>\n      <pre>Level:50\n110.00</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "11000\n100",
        "expected": "Level:50\n110.00",
        "hidden": false
      },
      {
        "input": "7376\n75",
        "expected": "Level:25\n98.00",
        "hidden": true
      },
      {
        "input": "4000\n40",
        "expected": "Level:0\n100.00",
        "hidden": true
      },
      {
        "input": "16000\n80",
        "expected": "Level:100\n200.00",
        "hidden": true
      },
      {
        "input": "5000\n50",
        "expected": "Level:25\n100.00",
        "hidden": true
      },
      {
        "input": "9999\n100",
        "expected": "Level:25\n99.00",
        "hidden": true
      }
    ]
  },
  {
    "id": "power-calculation",
    "title": "Power calculation",
    "difficulty": "Easy",
    "level": 1,
    "description": "\n      <p>You are developing a simple command-line program to calculate the power of a given base number raised to a specified exponent. This program will take user input for the base value and the value of the power and then output the result of the calculation.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>2\n3</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>8</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>5\n0</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>1</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "2\n3",
        "expected": "8",
        "hidden": false
      },
      {
        "input": "5\n0",
        "expected": "1",
        "hidden": true
      },
      {
        "input": "1\n5",
        "expected": "1",
        "hidden": true
      },
      {
        "input": "3\n4",
        "expected": "81",
        "hidden": true
      },
      {
        "input": "2\n10",
        "expected": "1024",
        "hidden": true
      },
      {
        "input": "0\n5",
        "expected": "0",
        "hidden": true
      }
    ]
  },
  {
    "id": "salary-prediction",
    "title": "Salary Prediction",
    "difficulty": "Easy",
    "level": 1,
    "description": "\n      <p>Consider that you are a human resources manager at a mid-sized company. Every year, the company conducts performance evaluations for its employees, and based on their performance, they receive a salary increment. To streamline the process and ensure transparency, you've decided to implement a program that calculates and displays the new salary of each employee based on their current salary and the percentage increment provided.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>50000\n20</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>60000</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>35000\n5</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>36750</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "50000\n20",
        "expected": "60000",
        "hidden": false
      },
      {
        "input": "35000\n5",
        "expected": "36750",
        "hidden": true
      },
      {
        "input": "100000\n10",
        "expected": "110000",
        "hidden": true
      },
      {
        "input": "1000\n100",
        "expected": "2000",
        "hidden": true
      },
      {
        "input": "42500\n12",
        "expected": "47600",
        "hidden": true
      },
      {
        "input": "25000\n0",
        "expected": "25000",
        "hidden": true
      }
    ]
  },
  {
    "id": "vehicle-registration",
    "title": "Vehicle Registration Information System",
    "difficulty": "Easy",
    "level": 1,
    "description": "\n      <p>Create a program that prompts the user to enter details about a vehicle's size, fuel type, and intended purpose.</p>\n      <ol>\n        <li>Read the vehicle size as S or M or L, where S means Small, M is Medium, L is Large. For input S output should be <strong>Vehicle Size: Small</strong></li>\n        <li>Read the fuel type as G or D or E, where G is Gasoline, D is Diesel, E is Electric. For input G output should be <strong>Fuel Type: Gasoline</strong></li>\n        <li>Read the vehicle's purpose as 1 or 2 or 3, where 1 means Personal Use, 2 means Commercial Use, 3 means Public Transport. For input 2 output should be <strong>Purpose: Commercial use</strong></li>\n        <li>Validate the inputs and display the corresponding information.</li>\n        <li>If any input is invalid, the program should inform the user and terminate. Like <strong>Invalid vehicle size.</strong>, <strong>Invalid fuel type.</strong>, <strong>Invalid purpose.</strong></li>\n      </ol>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>S\nG\nE</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Vehicle Size: Small\nFuel Type: Gasoline\nInvalid purpose.</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "S\nG\nE",
        "expected": "Vehicle Size: Small\nFuel Type: Gasoline\nInvalid purpose.",
        "hidden": false
      },
      {
        "input": "M\nD\n2",
        "expected": "Vehicle Size: Medium\nFuel Type: Diesel\nPurpose: Commercial use",
        "hidden": true
      },
      {
        "input": "L\nE\n3",
        "expected": "Vehicle Size: Large\nFuel Type: Electric\nPurpose: Public Transport",
        "hidden": true
      },
      {
        "input": "X\nG\n1",
        "expected": "Invalid vehicle size.",
        "hidden": true
      },
      {
        "input": "S\nZ\n1",
        "expected": "Vehicle Size: Small\nInvalid fuel type.",
        "hidden": true
      },
      {
        "input": "S\nG\n1",
        "expected": "Vehicle Size: Small\nFuel Type: Gasoline\nPurpose: Personal Use",
        "hidden": true
      }
    ]
  },
  {
    "id": "tax-calculation",
    "title": "Tax Calculation",
    "difficulty": "Easy",
    "level": 1,
    "description": "\n      <p>You're developing a tax calculation program to determine the tax owed based on income levels. The tax rates vary depending on income brackets: 5% for incomes below $10,000, 10% for incomes between $10,000 and $50,000, and 20% for incomes exceeding $50,000.</p>\n      <p>Craft a program to accurately calculate the tax owed based on the provided income brackets and tax rates. Print the output formatted with a dollar sign and 2 decimal places.</p>\n      <br/>\n      <p><strong>Formula for calculating tax owed:</strong></p>\n      <ul>\n        <li>If income < $10,000: tax = income * 0.05</li>\n        <li>If $10,000 <= income <= $50,000: tax = income * 0.10</li>\n        <li>If income > $50,000: tax = income * 0.20</li>\n      </ul>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>12000</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>$1200.00</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "12000",
        "expected": "$1200.00",
        "hidden": false
      },
      {
        "input": "7000",
        "expected": "$350.00",
        "hidden": true
      },
      {
        "input": "60000",
        "expected": "$12000.00",
        "hidden": true
      },
      {
        "input": "10000",
        "expected": "$1000.00",
        "hidden": true
      },
      {
        "input": "50000",
        "expected": "$5000.00",
        "hidden": true
      },
      {
        "input": "9999",
        "expected": "$499.95",
        "hidden": true
      }
    ]
  },
  {
    "id": "5-digit-checking",
    "title": "5 digit number checking",
    "difficulty": "Easy",
    "level": 1,
    "description": "\n      <p>Check whether the given number is a 5 digit number without using loops. In a user authentication system, individuals are prompted to input a numerical PIN to access their accounts. This program efficiently verifies whether the entered PIN is a 5-digit number. (The input may be a positive or negative number)</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>345</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>345 is not a 5-digit number</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>36893</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>36893 is a 5-digit number</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "345",
        "expected": "345 is not a 5-digit number",
        "hidden": false
      },
      {
        "input": "36893",
        "expected": "36893 is a 5-digit number",
        "hidden": true
      },
      {
        "input": "-12345",
        "expected": "-12345 is a 5-digit number",
        "hidden": true
      },
      {
        "input": "10000",
        "expected": "10000 is a 5-digit number",
        "hidden": true
      },
      {
        "input": "9999",
        "expected": "9999 is not a 5-digit number",
        "hidden": true
      },
      {
        "input": "99999",
        "expected": "99999 is a 5-digit number",
        "hidden": true
      }
    ]
  },
  {
    "id": "product-calculator",
    "title": "The Product Calculator",
    "difficulty": "Easy",
    "level": 1,
    "description": "\n      <p>Craft a program that prompts the user to input 2 integer values. Calculate their product. If the product is even divide it by 2 or divide it by 3 and display the result.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>13\n4</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>26</pre>\n    ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "13\n4",
        "expected": "26",
        "hidden": false
      },
      {
        "input": "3\n3",
        "expected": "3",
        "hidden": true
      },
      {
        "input": "5\n7",
        "expected": "11",
        "hidden": true
      },
      {
        "input": "6\n2",
        "expected": "6",
        "hidden": true
      },
      {
        "input": "5\n5",
        "expected": "8",
        "hidden": true
      },
      {
        "input": "0\n5",
        "expected": "0",
        "hidden": true
      }
    ]
  },
  {
    "id": "fibonacci-series",
    "title": "Fibonacci Series",
    "difficulty": "Medium",
    "level": 2,
    "description": "\n    <p>Generate the first <strong>N</strong> terms of the Fibonacci series.</p>\n    <p>In a Fibonacci series, the next number is the sum of the two preceding ones. The sequence starts with 0 and 1.</p>\n    <br/>\n    <p><strong>Sample Input:</strong></p>\n    <pre>5</pre>\n    <p><strong>Sample Output:</strong></p>\n    <pre>0 1 1 2 3</pre>\n  ",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5",
        "expected": "0 1 1 2 3",
        "hidden": false
      },
      {
        "input": "1",
        "expected": "0",
        "hidden": true
      },
      {
        "input": "2",
        "expected": "0 1",
        "hidden": true
      },
      {
        "input": "10",
        "expected": "0 1 1 2 3 5 8 13 21 34",
        "hidden": true
      },
      {
        "input": "20",
        "expected": "0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 2584 4181",
        "hidden": true
      },
      {
        "input": "7",
        "expected": "0 1 1 2 3 5 8",
        "hidden": true
      }
    ]
  }
];

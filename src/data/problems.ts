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
    id: 'prime-range',
    title: '1. Prime number with ranges',
    difficulty: 'Medium',
    level: 2,
    description: `
      <p>A prime number is a natural number greater than 1 that is not a product of two smaller natural numbers.</p>
      <p>Write a C program that reads two integers, <code>start</code> and <code>end</code>, and prints all prime numbers between <code>start</code> and <code>end</code> (inclusive), separated by spaces.</p>
      <p><strong>Note:</strong> You should use a <code>for</code> loop to iterate through the range and check for primality.</p>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>2 5</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>2 3 5</pre>
    `,
    functionName: 'main',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}',
    testCases: [
      { input: "2 5", expected: "2 3 5", hidden: false },
      { input: "10 20", expected: "11 13 17 19", hidden: true },
      { input: "1 10", expected: "2 3 5 7", hidden: true },
      { input: "20 30", expected: "23 29", hidden: true },
      { input: "100 120", expected: "101 103 107 109 113", hidden: true },
      { input: "50 60", expected: "53 59", hidden: true },
    ],
  },
  {
    id: 'collatz-sequence',
    title: '2. Collatz sequence',
    difficulty: 'Medium',
    level: 2,
    description: `
      <p>The Collatz sequence applies to positive integers:</p>
      <ul>
        <li>If <em>n</em> is even, divide it by 2.</li>
        <li>If <em>n</em> is odd, multiply it by 3 and add 1.</li>
      </ul>
      <p>Write a C program that reads an integer <code>n</code> and prints the number of steps it takes to reach 1.</p>
      <p><strong>Note:</strong> This is a great place to practice loops (like <code>while</code> or <code>for</code>) to simulate the sequence!</p>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>10</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>6</pre>
    `,
    functionName: 'main',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}',
    testCases: [
      { input: "10", expected: "6", hidden: false },
      { input: "1", expected: "0", hidden: true },
      { input: "12", expected: "9", hidden: true },
      { input: "27", expected: "111", hidden: true },
      { input: "50", expected: "24", hidden: true },
      { input: "15", expected: "17", hidden: true },
    ],
  },
  {
    id: 'harshad-number',
    title: '4. Harshad Number',
    difficulty: 'Easy',
    level: 2,
    description: `
      <p>A Harshad number is an integer that is divisible by the sum of its digits.</p>
      <p>Write a C program that reads a positive integer <code>n</code> and prints whether it is a Harshad number. Output format: "<code>[n] is a harshad number</code>" or "<code>[n] is not a harshad number</code>".</p>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>36</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>36 is a harshad number</pre>
    `,
    functionName: 'main',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}',
    testCases: [
      { input: "36", expected: "36 is a harshad number", hidden: false },
      { input: "15", expected: "15 is not a harshad number", hidden: true },
      { input: "18", expected: "18 is a harshad number", hidden: true },
      { input: "19", expected: "19 is not a harshad number", hidden: true },
      { input: "100", expected: "100 is a harshad number", hidden: true },
      { input: "21", expected: "21 is a harshad number", hidden: true },
    ],
  },
  {
    id: 'product-of-digit',
    title: '5. Product of a digit',
    difficulty: 'Easy',
    level: 2,
    description: `
      <p>Write a C program that reads an integer <code>n</code> and prints the product of its digits.</p>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>65</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>30</pre>
    `,
    functionName: 'main',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}',
    testCases: [
      { input: "65", expected: "30", hidden: false },
      { input: "123", expected: "6", hidden: true },
      { input: "90", expected: "0", hidden: true },
      { input: "456", expected: "120", hidden: true },
      { input: "1111", expected: "1", hidden: true },
      { input: "7", expected: "7", hidden: true },
    ],
  },
  {
    id: 'strong-number',
    title: '10. Strong number',
    difficulty: 'Medium',
    level: 2,
    description: `
      <p>A Strong number is a number whose sum of the factorial of its digits is equal to the number itself.</p>
      <p>Write a C program that reads an integer <code>n</code> and prints whether it is a strong number. Output format: "<code>[n] is a Strong number</code>" or "<code>[n] is not a Strong number</code>".</p>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>145</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>145 is a Strong number</pre>
    `,
    functionName: 'main',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}',
    testCases: [
      { input: "145", expected: "145 is a Strong number", hidden: false },
      { input: "2", expected: "2 is a Strong number", hidden: true },
      { input: "10", expected: "10 is not a Strong number", hidden: true },
      { input: "40585", expected: "40585 is a Strong number", hidden: true },
      { input: "150", expected: "150 is not a Strong number", hidden: true },
      { input: "1", expected: "1 is a Strong number", hidden: true },
    ],
  },
  {
    id: 'palindrome-number',
    title: '12. Palindrome or not',
    difficulty: 'Easy',
    level: 2,
    description: `
      <p>A palindrome number reads the same forwards and backwards.</p>
      <p>Write a C program that reads an integer <code>n</code> and prints whether it is a palindrome. Output format: "<code>[n] is a palindrome number</code>" or "<code>[n] is not a palindrome number</code>".</p>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>232</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>232 is a palindrome number</pre>
    `,
    functionName: 'main',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}',
    testCases: [
      { input: "232", expected: "232 is a palindrome number", hidden: false },
      { input: "123", expected: "123 is not a palindrome number", hidden: true },
      { input: "1221", expected: "1221 is a palindrome number", hidden: true },
      { input: "10", expected: "10 is not a palindrome number", hidden: true },
      { input: "5", expected: "5 is a palindrome number", hidden: true },
      { input: "888", expected: "888 is a palindrome number", hidden: true },
    ],
  },
  {
    id: 'armstrong-number',
    title: '13. Armstrong number',
    difficulty: 'Medium',
    level: 2,
    description: `
      <p>An Armstrong number of 3 digits is an integer such that the sum of the cubes of its digits is equal to the number itself. Generalizing, for an n-digit number, the sum of its digits each raised to the power n equals the number.</p>
      <p>Write a C program that reads an integer <code>n</code> and prints whether it is an Armstrong number. Output format: "<code>[n] is a armstrong number</code>" or "<code>[n] is not a armstrong number</code>".</p>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>153</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>153 is a armstrong number</pre>
    `,
    functionName: 'main',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}',
    testCases: [
      { input: "153", expected: "153 is a armstrong number", hidden: false },
      { input: "370", expected: "370 is a armstrong number", hidden: true },
      { input: "123", expected: "123 is not a armstrong number", hidden: true },
      { input: "9474", expected: "9474 is a armstrong number", hidden: true },
      { input: "9475", expected: "9475 is not a armstrong number", hidden: true },
      { input: "371", expected: "371 is a armstrong number", hidden: true },
    ],
  },
  {
    id: 'twin-primes',
    title: '16. Twin Primes',
    difficulty: 'Hard',
    level: 2,
    description: `
      <p>Twin primes are pairs of primes which differ by 2. (e.g., 3 and 5, 11 and 13).</p>
      <p>Write a C program that reads two integers <code>start</code> and <code>end</code>, and prints twin prime pairs in the given range. Output format for each pair: "<code>(prime1 prime2 )</code>" on a new line.</p>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>1 20</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>(3 5 )
(5 7 )
(11 13 )
(17 19 )
</pre>
    `,
    functionName: 'main',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}',
    testCases: [
      { input: "1 20", expected: "(3 5 )\n(5 7 )\n(11 13 )\n(17 19 )\n", hidden: false },
      { input: "20 40", expected: "(29 31 )\n", hidden: true },
      { input: "40 50", expected: "(41 43 )\n", hidden: true },
      { input: "1 10", expected: "(3 5 )\n(5 7 )\n", hidden: true },
      { input: "50 75", expected: "(59 61 )\n(71 73 )\n", hidden: true },
      { input: "10 20", expected: "(11 13 )\n(17 19 )\n", hidden: true },
    ],
  },
  {
    id: 'working-with-character',
    title: '3. Working with character',
    difficulty: 'Easy',
    level: 2,
    description: `
      <p>Write a C program that reads a single character. If the character is lowercase, it should print its uppercase version. If it is uppercase, it should print its lowercase version. If it is not an alphabet character, print "It is not a alphabet".</p>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>A</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>a</pre>
    `,
    functionName: 'main',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}',
    testCases: [
      { input: "A", expected: "a", hidden: false },
      { input: "b", expected: "B", hidden: true },
      { input: "$", expected: "It is not a alphabet", hidden: true },
      { input: "Z", expected: "z", hidden: true },
      { input: "9", expected: "It is not a alphabet", hidden: true },
      { input: "m", expected: "M", hidden: true },
    ],
  },
  {
    id: 'pattern-stars',
    title: '6. Pattern',
    difficulty: 'Medium',
    level: 2,
    description: `
      <p>Write a C program that reads an integer <code>n</code> and prints a right-angled triangle pattern of stars with <code>n</code> rows. Each row should contain stars separated by a space, and a trailing space at the end of each row.</p>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>3</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>* 
* * 
* * * 
</pre>
    `,
    functionName: 'main',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}',
    testCases: [
      { input: "3", expected: "* \n* * \n* * * \n", hidden: false },
      { input: "5", expected: "* \n* * \n* * * \n* * * * \n* * * * * \n", hidden: true },
      { input: "1", expected: "* \n", hidden: true },
      { input: "2", expected: "* \n* * \n", hidden: true },
      { input: "4", expected: "* \n* * \n* * * \n* * * * \n", hidden: true },
      { input: "6", expected: "* \n* * \n* * * \n* * * * \n* * * * * \n* * * * * * \n", hidden: true },
    ],
  },
  {
    id: 'sum-of-digits',
    title: '14. Sum of a digit',
    difficulty: 'Easy',
    level: 2,
    description: `
      <p>Write a C program that reads a positive integer <code>n</code> and prints the sum of its digits.</p>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>231456</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>21</pre>
    `,
    functionName: 'main',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}',
    testCases: [
      { input: "231456", expected: "21", hidden: false },
      { input: "123", expected: "6", hidden: true },
      { input: "9090", expected: "18", hidden: true },
      { input: "5", expected: "5", hidden: true },
      { input: "999", expected: "27", hidden: true },
      { input: "1000", expected: "1", hidden: true },
    ],
  },

  {
    id: 'alphabet-check',
    title: '1. Alphabet Check',
    difficulty: 'Easy',
    level: 1,
    description: `
      <p>Craft a program to check whether a given character is an alphabet or not. The program should prompt the user to enter a character, then it should determine if the entered character is an alphabet or not.</p>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>T</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>T is an Alphabet.</pre>
    `,
    functionName: 'main',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}',
    testCases: [
      { input: "T", expected: "T is an Alphabet.", hidden: false },
      { input: "7", expected: "7 is not an Alphabet.", hidden: true },
      { input: "a", expected: "a is an Alphabet.", hidden: true },
      { input: "!", expected: "! is not an Alphabet.", hidden: true },
      { input: "z", expected: "z is an Alphabet.", hidden: true },
      { input: " ", expected: "  is not an Alphabet.", hidden: true },
    ]
  },
  {
    id: 'number-comparison',
    title: '2. Number Comparison',
    difficulty: 'Easy',
    level: 1,
    description: `
      <p>Tom, a math teacher, wants to create a simple program to compare two numbers provided by his students. By providing this tool, he aims to help his students understand basic number comparison concepts and improve their problem-solving skills.</p>
      <p>Craft a program that prompts the user to input two numbers and then determines which one is greater, lesser, or if they are equal.</p>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>10
5</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>10 is greater than 5.</pre>
    `,
    functionName: 'main',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}',
    testCases: [
      { input: "10\n5", expected: "10 is greater than 5.", hidden: false },
      { input: "7\n12", expected: "12 is greater than 7.", hidden: true },
      { input: "8\n8", expected: "8 is equal to 8.", hidden: true },
      { input: "-5\n-10", expected: "-5 is greater than -10.", hidden: true },
      { input: "0\n0", expected: "0 is equal to 0.", hidden: true },
      { input: "-20\n5", expected: "5 is greater than -20.", hidden: true },
    ]
  },
  {
    id: 'battery-status',
    title: '3. Battery Status Checker',
    difficulty: 'Easy',
    level: 1,
    description: `
      <p>Craft a program that prompts the user to enter an integer and that determines the status of a battery based on its charge level.</p>
      <p>Determine the status of the battery based on the charge level using statements:</p>
      <ul>
        <li>If the charge level is less than or equal to 20, the status is <strong>Low</strong></li>
        <li>If the charge level is greater than or equal to 21 and less than or equal to 70, the status is <strong>Medium</strong></li>
        <li>If the charge level is greater than or equal to 71 and less than or equal to 95, the status is <strong>Almost Full</strong></li>
        <li>If the charge level is greater than or equal to 96 and less than or equal to 100, the status is <strong>Full</strong></li>
        <li>If the charge level is less than 0 or greater than 100, print <strong>Invalid charge level</strong></li>
      </ul>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>40</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>Medium</pre>
    `,
    functionName: 'main',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}',
    testCases: [
      { input: "40", expected: "Medium", hidden: false },
      { input: "85", expected: "Almost Full", hidden: true },
      { input: "10", expected: "Low", hidden: true },
      { input: "100", expected: "Full", hidden: true },
      { input: "105", expected: "Invalid charge level", hidden: true },
      { input: "-5", expected: "Invalid charge level", hidden: true },
    ]
  },
  {
    id: 'train-speed',
    title: '4. Calculate the speed of the train',
    difficulty: 'Easy',
    level: 1,
    description: `
      <p>Get two inputs:</p>
      <ul>
        <li>One to enter the Distance traveled by the train in Kilometers</li>
        <li>Another is to enter the time taken by the train to cover the above distance (in hours)</li>
      </ul>
      <p>Find the speed of the train and display it with 2 decimal places. And comment on the speed by displaying:</p>
      <ul>
        <li><strong>Very slow</strong> if speed is less than 50 km/hr</li>
        <li><strong>Over speed</strong> if speed is greater than 120 km/hr</li>
        <li><strong>Average speed</strong> if the speed is normal</li>
      </ul>
      <p>Hint: speed = distance / time</p>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>150
2</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>75.00
Average speed</pre>
    `,
    functionName: 'main',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}',
    testCases: [
      { input: "150\n2", expected: "75.00\nAverage speed", hidden: false },
      { input: "200\n5", expected: "40.00\nVery slow", hidden: true },
      { input: "300\n2", expected: "150.00\nOver speed", hidden: true },
      { input: "120\n2", expected: "60.00\nAverage speed", hidden: true },
      { input: "240\n2", expected: "120.00\nAverage speed", hidden: true },
      { input: "50\n1", expected: "50.00\nAverage speed", hidden: true },
    ]
  },
  {
    id: 'shipping-cost',
    title: '5. Calculate Shipping Costs',
    difficulty: 'Easy',
    level: 1,
    description: `
      <p>Imagine you're the lead developer for an online store, tasked with designing a program to calculate shipping costs for orders.</p>
      <p>The store offers two shipping options: free shipping for orders totaling over $50, and a flat shipping fee of $5 for orders below that threshold.</p>
      <p>Implement the shipping cost calculation logic. If the order total is over $50, the program should output "Shipping is free." Otherwise, it should output "Shipping fee: $5." Handle 0 or negative values as "Invalid Amount."</p>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>10</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>10.00 Shipping fee is $5.</pre>
    `,
    functionName: 'main',
    starterCode: '#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}',
    testCases: [
      { input: "10", expected: "10.00 Shipping fee is $5.", hidden: false },
      { input: "70", expected: "70.00 Shipping is free.", hidden: true },
      { input: "-5", expected: "Invalid Amount.", hidden: true },
      { input: "50", expected: "50.00 Shipping fee is $5.", hidden: true },
      { input: "100", expected: "100.00 Shipping is free.", hidden: true },
      { input: "0", expected: "Invalid Amount.", hidden: true },
    ]
  }
];

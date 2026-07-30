const fs = require('fs');

let content = fs.readFileSync('src/data/problems.ts', 'utf8');

const level1Problems = `
  {
    id: 'alphabet-check',
    title: '1. Alphabet Check',
    difficulty: 'Easy',
    level: 1,
    description: \`
      <p>Craft a program to check whether a given character is an alphabet or not. The program should prompt the user to enter a character, then it should determine if the entered character is an alphabet or not.</p>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>T</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>T is an Alphabet.</pre>
      <p><strong>Sample Input 2:</strong></p>
      <pre>7</pre>
      <p><strong>Sample Output 2:</strong></p>
      <pre>7 is not an Alphabet.</pre>
    \`,
    functionName: 'main',
    starterCode: '#include <stdio.h>\\n\\nint main() {\\n    // Write your code here\\n    \\n    return 0;\\n}',
    testCases: [
      { input: "T", expected: "T is an Alphabet.", hidden: false },
      { input: "7", expected: "7 is not an Alphabet.", hidden: false },
      { input: "a", expected: "a is an Alphabet.", hidden: true },
      { input: "!", expected: "! is not an Alphabet.", hidden: true }
    ]
  },
  {
    id: 'number-comparison',
    title: '2. Number Comparison',
    difficulty: 'Easy',
    level: 1,
    description: \`
      <p>Tom, a math teacher, wants to create a simple program to compare two numbers provided by his students. By providing this tool, he aims to help his students understand basic number comparison concepts and improve their problem-solving skills.</p>
      <p>Craft a program that prompts the user to input two numbers and then determines which one is greater, lesser, or if they are equal.</p>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>10\\n5</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>10 is greater than 5.</pre>
      <p><strong>Sample Input 2:</strong></p>
      <pre>7\\n12</pre>
      <p><strong>Sample Output 2:</strong></p>
      <pre>12 is greater than 7.</pre>
    \`,
    functionName: 'main',
    starterCode: '#include <stdio.h>\\n\\nint main() {\\n    // Write your code here\\n    \\n    return 0;\\n}',
    testCases: [
      { input: "10\\n5", expected: "10 is greater than 5.", hidden: false },
      { input: "7\\n12", expected: "12 is greater than 7.", hidden: false },
      { input: "8\\n8", expected: "8 is equal to 8.", hidden: true }
    ]
  },
  {
    id: 'battery-status',
    title: '3. Battery Status Checker',
    difficulty: 'Easy',
    level: 1,
    description: \`
      <p>Craft a program that prompts the user to enter an integer and that determines the status of a battery based on its charge level.</p>
      <p>Determine the status of the battery based on the charge level using statements:</p>
      <ul>
        <li>If the charge level is less than or equal to 20, the status is <strong>Low</strong></li>
        <li>If the charge level is greater than 21 and less than or equal to 70, the status is <strong>Medium</strong></li>
        <li>If the charge level is greater than 71 and less than or equal to 95, the status is <strong>Almost Full</strong></li>
        <li>If the charge level is greater than 96 and less than or equal to 100, the status is <strong>Full</strong></li>
        <li>If the charge level is less than 0 or greater than 100, print <strong>Invalid charge level</strong></li>
      </ul>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>40</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>Medium</pre>
      <p><strong>Sample Input 2:</strong></p>
      <pre>85</pre>
      <p><strong>Sample Output 2:</strong></p>
      <pre>Almost Full</pre>
    \`,
    functionName: 'main',
    starterCode: '#include <stdio.h>\\n\\nint main() {\\n    // Write your code here\\n    \\n    return 0;\\n}',
    testCases: [
      { input: "40", expected: "Medium", hidden: false },
      { input: "85", expected: "Almost Full", hidden: false },
      { input: "10", expected: "Low", hidden: true },
      { input: "100", expected: "Full", hidden: true },
      { input: "105", expected: "Invalid charge level", hidden: true }
    ]
  },
  {
    id: 'train-speed',
    title: '4. Calculate the speed of the train',
    difficulty: 'Easy',
    level: 1,
    description: \`
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
    \`,
    functionName: 'main',
    starterCode: '#include <stdio.h>\\n\\nint main() {\\n    // Write your code here\\n    \\n    return 0;\\n}',
    testCases: [
      { input: "150\\n2", expected: "75.00\\nAverage speed", hidden: false },
      { input: "200\\n5", expected: "40.00\\nVery slow", hidden: false },
      { input: "300\\n2", expected: "150.00\\nOver speed", hidden: true }
    ]
  },
  {
    id: 'shipping-cost',
    title: '5. Calculate Shipping Costs',
    difficulty: 'Easy',
    level: 1,
    description: \`
      <p>Imagine you're the lead developer for an online store, tasked with designing a program to calculate shipping costs for orders.</p>
      <p>The store offers two shipping options: free shipping for orders totaling over $50, and a flat shipping fee of $5 for orders below that threshold.</p>
      <p>Implement the shipping cost calculation logic. If the order total is over $50, the program should output "Shipping is free." Otherwise, it should output "Shipping fee: $5." Handle the Negative value as "Invalid Amount."</p>
      <br/>
      <p><strong>Sample Input 1:</strong></p>
      <pre>10</pre>
      <p><strong>Sample Output 1:</strong></p>
      <pre>10.00 Shipping fee is $5.</pre>
      <p><strong>Sample Input 2:</strong></p>
      <pre>70</pre>
      <p><strong>Sample Output 2:</strong></p>
      <pre>70.00 Shipping is free.</pre>
    \`,
    functionName: 'main',
    starterCode: '#include <stdio.h>\\n\\nint main() {\\n    // Write your code here\\n    \\n    return 0;\\n}',
    testCases: [
      { input: "10", expected: "10.00 Shipping fee is $5.", hidden: false },
      { input: "70", expected: "70.00 Shipping is free.", hidden: false },
      { input: "-5", expected: "Invalid Amount.", hidden: true },
      { input: "50", expected: "50.00 Shipping fee is $5.", hidden: true }
    ]
  }
];
`;

content = content.replace(/\n\];$/m, `,\n${level1Problems.slice(0, -2)}\n];`);

fs.writeFileSync('src/data/problems.ts', content);

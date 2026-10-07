export interface TestCase {
  input: string;
  expected: string;
  hidden: boolean;
  matchType?: 'exact' | 'numeric' | 'regex' | 'normalized';
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
    "id": "alphabet-check",
    "title": "1. Alphabet Check",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Craft a program to check whether a given character is an alphabet or not. The program should prompt the user to enter a character, then it should determine if the entered character is an alphabet or not.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>T</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>T is an Alphabet.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>7</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>7 is not an Alphabet.</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>a</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>a is an Alphabet.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "T",
        "expected": "T is an Alphabet.",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "7",
        "expected": "7 is not an Alphabet.",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "a",
        "expected": "a is an Alphabet.",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "!",
        "expected": "! is not an Alphabet.",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "z",
        "expected": "z is an Alphabet.",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": " ",
        "expected": "  is not an Alphabet.",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "Z",
        "expected": "Z is an Alphabet.",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5",
        "expected": "5 is not an Alphabet.",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "number-comparison",
    "title": "2. Number Comparison",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Tom, a math teacher, wants to create a simple program to compare two numbers provided by his students. By providing this tool, he aims to help his students understand basic number comparison concepts and improve their problem-solving skills.</p>\n      <p>Craft a program that prompts the user to input two numbers and then determines which one is greater, lesser, or if they are equal.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>10\n5</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>10 is greater than 5.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>7\n12</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>12 is greater than 7.</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>8\n8</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>8 is equal to 8.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "10\n5",
        "expected": "10 is greater than 5.",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "7\n12",
        "expected": "12 is greater than 7.",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "8\n8",
        "expected": "8 is equal to 8.",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "-5\n-10",
        "expected": "-5 is greater than -10.",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "0\n0",
        "expected": "0 is equal to 0.",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "-20\n5",
        "expected": "5 is greater than -20.",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "100\n-100",
        "expected": "100 is greater than -100.",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "0\n5",
        "expected": "5 is greater than 0.",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "battery-status",
    "title": "3. Battery Status Checker",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Craft a program that prompts the user to enter an integer and that determines the status of a battery based on its charge level.</p>\n      <p>Determine the status of the battery based on the charge level using statements:</p>\n      <ul>\n        <li>If the charge level is less than or equal to 20, the status is <strong>Low</strong></li>\n        <li>If the charge level is greater than or equal to 21 and less than or equal to 70, the status is <strong>Medium</strong></li>\n        <li>If the charge level is greater than or equal to 71 and less than or equal to 95, the status is <strong>Almost Full</strong></li>\n        <li>If the charge level is greater than or equal to 96 and less than or equal to 100, the status is <strong>Full</strong></li>\n        <li>If the charge level is less than 0 or greater than 100, print <strong>Invalid charge level</strong></li>\n      </ul>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>40</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Medium</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>105</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Invalid charge level</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>85</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Almost Full</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "40",
        "expected": "Medium",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "85",
        "expected": "Almost Full",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "105",
        "expected": "Invalid charge level",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "10",
        "expected": "Low",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "100",
        "expected": "Full",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "-5",
        "expected": "Invalid charge level",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "21",
        "expected": "Medium",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "96",
        "expected": "Full",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "train-speed",
    "title": "4. Calculate the speed of the train",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Get two inputs:</p>\n      <ul>\n        <li>One to enter the Distance traveled by the train in Kilometers</li>\n        <li>Another is to enter the time taken by the train to cover the above distance (in hours)</li>\n      </ul>\n      <p>Find the speed of the train and display it with 2 decimal places. And comment on the speed by displaying:</p>\n      <ul>\n        <li><strong>Very slow</strong> if speed is less than 50 km/hr</li>\n        <li><strong>Over speed</strong> if speed is greater than 120 km/hr</li>\n        <li><strong>Average speed</strong> if the speed is normal</li>\n      </ul>\n      <p>Hint: speed = distance / time</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>150\n2</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>75.00\nAverage speed</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>200\n5</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>40.00\nVery slow</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>300\n2</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>150.00\nOver speed</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "150\n2",
        "expected": "75.00\nAverage speed",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "200\n5",
        "expected": "40.00\nVery slow",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "300\n2",
        "expected": "150.00\nOver speed",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "120\n2",
        "expected": "60.00\nAverage speed",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "240\n2",
        "expected": "120.00\nAverage speed",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "50\n1",
        "expected": "50.00\nAverage speed",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "100\n4",
        "expected": "25.00\nVery slow",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "500\n2",
        "expected": "250.00\nOver speed",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "shipping-cost",
    "title": "5. Calculate Shipping Costs",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Imagine you're the lead developer for an online store, tasked with designing a program to calculate shipping costs for orders.</p>\n      <p>The store offers two shipping options: free shipping for orders totaling over $50, and a flat shipping fee of $5 for orders below that threshold.</p>\n      <p>Implement the shipping cost calculation logic. If the order total is over $50, the program should output the order total with 2 decimal places followed by \" Shipping is free.\" Otherwise, it should output the order total with 2 decimal places followed by \" Shipping fee is $5.\" Handle 0 or negative values as \"Invalid Amount.\"</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>10</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>10.00 Shipping fee is $5.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>70</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>70.00 Shipping is free.</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>-5</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Invalid Amount.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "10",
        "expected": "10.00 Shipping fee is $5.",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "70",
        "expected": "70.00 Shipping is free.",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "-5",
        "expected": "Invalid Amount.",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "50",
        "expected": "50.00 Shipping fee is $5.",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "100",
        "expected": "100.00 Shipping is free.",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "0",
        "expected": "Invalid Amount.",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "51",
        "expected": "51.00 Shipping is free.",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "25.99",
        "expected": "25.99 Shipping fee is $5.",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "attendance-percentage",
    "title": "6. Attendance percentage of a student",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>The given code is a program that calculates the attendance percentage of a student and checks if the student is eligible to sit for the exam. The program takes two inputs - the total number of hours of classes held and the total number of hours of classes attended by the student. It then calculates the attendance percentage and prints it.</p>\n      <p>If the attendance percentage is 75 or more, it prints <strong>You are allowed to sit in the exam</strong>, otherwise it prints <strong>You are not allowed to sit in the exam</strong>.</p>\n      <p><code>percentage = (total number of hours of classes attended by the student / total number of hours of classes held) * 100</code></p>\n      <p>If the percentage is between 66 (inclusive) to 74 (inclusive), print the message as stated above and then print <strong>Apply for Condonation</strong>.</p>\n      <p>If the percentage is below 66 (excluded), then print the message as stated above and then print <strong>Not eligible for Condonation</strong>.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>100\n75\nY</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>75\nAllowed</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>100\n60\nN</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>60\nNot Allowed</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>100\n90\nN</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>90\nAllowed</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "100\n75\nY",
        "expected": "75\nAllowed",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "100\n60\nN",
        "expected": "60\nNot Allowed",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "100\n90\nN",
        "expected": "90\nAllowed",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "100\n60\nY",
        "expected": "60\nAllowed",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "150\n112\nN",
        "expected": "74\nNot Allowed",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "200\n150\nY",
        "expected": "75\nAllowed",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "200\n132\nN",
        "expected": "66\nNot Allowed",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "80\n70\nY",
        "expected": "87\nAllowed",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "employee-gross-salary",
    "title": "7. Employee Gross Salary Calculation",
    "difficulty": "Medium",
    "level": 1,
    "description": "<p>In an employee management system, users input a staff member's basic salary. The program efficiently calculates the Gross salary, incorporating specific allowances based on conditions:</p>\n      <ul>\n        <li>If Basic Salary is <= 10000: HRA = 20%, DA = 80%</li>\n        <li>If Basic Salary is between 10001 to 20000: HRA = 25%, DA = 90%</li>\n        <li>If Basic Salary is >= 20001: HRA = 30%, DA = 95%</li>\n      </ul>\n      <p>This ensures immediate and accurate feedback on the employee's Gross salary within the application. Print the gross salary with 2 decimal places.</p>\n      <p><strong>[Hint: Salary = Basic salary + HRA + DA]</strong></p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>45678</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>102775.50</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>22000</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>49500.00</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>10000</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>20000.00</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "45678",
        "expected": "102775.50",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "22000",
        "expected": "49500.00",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "10000",
        "expected": "20000.00",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "15000",
        "expected": "32250.00",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "20000",
        "expected": "43000.00",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5000",
        "expected": "10000.00",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "10001",
        "expected": "21502.15",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "20001",
        "expected": "45002.25",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "fitness-challenge",
    "title": "8. The Fitness Challenge",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Craft a program that prompts the user to input the number of steps they took in a day and time (in minutes) taken for the activity. The program should then categorize their fitness level as follows:</p>\n      <ul>\n        <li>Less than 5000 steps: Activity Level - 0</li>\n        <li>5000 to 9999 steps: Activity Level - 25</li>\n        <li>10000 to 14999 steps: Activity Level - 50</li>\n        <li>15000 steps and above: Activity Level - 100</li>\n      </ul>\n      <p>Also predict their activity range = steps / time taken. Print the activity range with two decimal points. Note: Calculate steps / time using integer division before printing as a float.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>11000\n100</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Level:50\n110.00</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>7376\n75</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Level:25\n98.00</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>4000\n40</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Level:0\n100.00</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "11000\n100",
        "expected": "Level:50\n110.00",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "7376\n75",
        "expected": "Level:25\n98.00",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4000\n40",
        "expected": "Level:0\n100.00",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "16000\n80",
        "expected": "Level:100\n200.00",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5000\n50",
        "expected": "Level:25\n100.00",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "9999\n100",
        "expected": "Level:25\n99.00",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "15000\n60",
        "expected": "Level:100\n250.00",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4999\n30",
        "expected": "Level:0\n166.00",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "power-calculation",
    "title": "9. Power calculation",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>You are developing a simple command-line program to calculate the power of a given base number raised to a specified exponent. This program will take user input for the base value and the value of the power and then output the result of the calculation.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>2\n3</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>8</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>5\n0</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>1</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>3\n4</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>81</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "2\n3",
        "expected": "8",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "5\n0",
        "expected": "1",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n4",
        "expected": "81",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "1\n5",
        "expected": "1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "2\n10",
        "expected": "1024",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "0\n5",
        "expected": "0",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "7\n2",
        "expected": "49",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "10\n3",
        "expected": "1000",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "salary-prediction",
    "title": "10. Salary Prediction",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Consider that you are a human resources manager at a mid-sized company. Every year, the company conducts performance evaluations for its employees, and based on their performance, they receive a salary increment. To streamline the process and ensure transparency, you've decided to implement a program that calculates and displays the new salary of each employee based on their current salary and the percentage increment provided.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>50000\n20</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>60000</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>35000\n5</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>36750</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>100000\n10</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>110000</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "50000\n20",
        "expected": "60000",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "35000\n5",
        "expected": "36750",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "100000\n10",
        "expected": "110000",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "1000\n100",
        "expected": "2000",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "42500\n12",
        "expected": "47600",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "25000\n0",
        "expected": "25000",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "60000\n15",
        "expected": "69000",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "80000\n25",
        "expected": "100000",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "vehicle-registration",
    "title": "11. Vehicle Registration Information System",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Create a program that prompts the user to enter details about a vehicle's size, fuel type, and intended purpose.</p>\n      <ol>\n        <li>Read the vehicle size as S or M or L, where S means Small, M is Medium, L is Large. For input S output should be <strong>Vehicle Size: Small</strong></li>\n        <li>Read the fuel type as G or D or E, where G is Gasoline, D is Diesel, E is Electric. For input G output should be <strong>Fuel Type: Gasoline</strong></li>\n        <li>Read the vehicle's purpose as 1 or 2 or 3, where 1 means Personal Use, 2 means Commercial Use, 3 means Public Transport. For input 2 output should be <strong>Purpose: Commercial use</strong></li>\n        <li>Validate the inputs and display the corresponding information.</li>\n        <li>If any input is invalid, the program should inform the user and terminate. Like <strong>Invalid vehicle size.</strong>, <strong>Invalid fuel type.</strong>, <strong>Invalid purpose.</strong></li>\n      </ol>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>S\nG\nE</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Vehicle Size: Small\nFuel Type: Gasoline\nInvalid purpose.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>M\nD\n2</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Vehicle Size: Medium\nFuel Type: Diesel\nPurpose: Commercial use</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>L\nE\n3</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Vehicle Size: Large\nFuel Type: Electric\nPurpose: Public Transport</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "S\nG\nE",
        "expected": "Vehicle Size: Small\nFuel Type: Gasoline\nInvalid purpose.",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "M\nD\n2",
        "expected": "Vehicle Size: Medium\nFuel Type: Diesel\nPurpose: Commercial use",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "L\nE\n3",
        "expected": "Vehicle Size: Large\nFuel Type: Electric\nPurpose: Public Transport",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "X\nG\n1",
        "expected": "Invalid vehicle size.",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "S\nZ\n1",
        "expected": "Vehicle Size: Small\nInvalid fuel type.",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "S\nG\n1",
        "expected": "Vehicle Size: Small\nFuel Type: Gasoline\nPurpose: Personal Use",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "L\nD\n2",
        "expected": "Vehicle Size: Large\nFuel Type: Diesel\nPurpose: Commercial use",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "M\nG\n9",
        "expected": "Vehicle Size: Medium\nFuel Type: Gasoline\nInvalid purpose.",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "tax-calculation",
    "title": "12. Tax Calculation",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>You're developing a tax calculation program to determine the tax owed based on income levels. The tax rates vary depending on income brackets: 5% for incomes below $10,000, 10% for incomes between $10,000 and $50,000, and 20% for incomes exceeding $50,000.</p>\n      <p>Craft a program to accurately calculate the tax owed based on the provided income brackets and tax rates. Print the output formatted with a dollar sign and 2 decimal places.</p>\n      <br/>\n      <p><strong>Formula for calculating tax owed:</strong></p>\n      <ul>\n        <li>If income < $10,000: tax = income * 0.05</li>\n        <li>If $10,000 <= income <= $50,000: tax = income * 0.10</li>\n        <li>If income > $50,000: tax = income * 0.20</li>\n      </ul>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>12000</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>$1200.00</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>7000</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>$350.00</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>60000</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>$12000.00</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "12000",
        "expected": "$1200.00",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "7000",
        "expected": "$350.00",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "60000",
        "expected": "$12000.00",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "10000",
        "expected": "$1000.00",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "50000",
        "expected": "$5000.00",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "9999",
        "expected": "$499.95",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "49999",
        "expected": "$4999.90",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "75000",
        "expected": "$15000.00",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "5-digit-checking",
    "title": "13. 5 digit number checking",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Check whether the given number is a 5 digit number without using loops. In a user authentication system, individuals are prompted to input a numerical PIN to access their accounts. This program efficiently verifies whether the entered PIN is a 5-digit number. (The input may be a positive or negative number)</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>345</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>345 is not a 5-digit number</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>36893</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>36893 is a 5-digit number</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>-12345</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>-12345 is a 5-digit number</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "345",
        "expected": "345 is not a 5-digit number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "36893",
        "expected": "36893 is a 5-digit number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "-12345",
        "expected": "-12345 is a 5-digit number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "10000",
        "expected": "10000 is a 5-digit number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "9999",
        "expected": "9999 is not a 5-digit number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "99999",
        "expected": "99999 is a 5-digit number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "-99999",
        "expected": "-99999 is a 5-digit number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "100000",
        "expected": "100000 is not a 5-digit number",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "product-calculator",
    "title": "14. The Product Calculator",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Craft a program that prompts the user to input 2 integer values. Calculate their product. If the product is even divide it by 2 or divide it by 3 and display the result.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>13\n4</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>26</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>3\n3</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>3</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>5\n7</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>11</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "13\n4",
        "expected": "26",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n3",
        "expected": "3",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "5\n7",
        "expected": "11",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "6\n2",
        "expected": "6",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n5",
        "expected": "8",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "0\n5",
        "expected": "0",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "8\n8",
        "expected": "32",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "7\n9",
        "expected": "21",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l2-p1-roman-numeral",
    "title": "1. Roman Numeral",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Write a program to convert an integer into a Roman numeral. The input number will be between 1 and 40.</p>\n      <p>If the input is outside this range, print <code>Invalid input</code>.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>4</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>IV</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>45</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Invalid input</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>1</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>I</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "4",
        "expected": "IV\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "I\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "45",
        "expected": "Invalid input\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "9",
        "expected": "IX\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "19",
        "expected": "XIX\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "34",
        "expected": "XXXIV\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "40",
        "expected": "XL\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "0",
        "expected": "Invalid input\n",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p2-square-pattern",
    "title": "2. Square Pattern",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Write a program to print a square pattern of '#' characters with size N.</p>\n      <p>If N is less than or equal to 0, print <code>Invalid input</code>.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>4</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre># # # # \n# # # # \n# # # # \n# # # #</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>1</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>#</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>2</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre># # \n# #</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "4",
        "expected": "# # # # \n# # # # \n# # # # \n# # # # \n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "# \n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "# # \n# # \n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "5",
        "expected": "# # # # # \n# # # # # \n# # # # # \n# # # # # \n# # # # # \n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "0",
        "expected": "Invalid input\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "-2",
        "expected": "Invalid input\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "10",
        "expected": "# # # # # # # # # # \n# # # # # # # # # # \n# # # # # # # # # # \n# # # # # # # # # # \n# # # # # # # # # # \n# # # # # # # # # # \n# # # # # # # # # # \n# # # # # # # # # # \n# # # # # # # # # # \n# # # # # # # # # # \n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3",
        "expected": "# # # \n# # # \n# # #",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p3-perfect-number",
    "title": "3. Perfect Number",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Write a program to check if a number is a perfect number (if perfect it will print the largest proper divisor else it will print the given number).</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>6</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>3</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>10</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>10</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>28</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>14</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "6",
        "expected": "3\n",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "10",
        "expected": "10\n",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "28",
        "expected": "14\n",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "12",
        "expected": "12\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "496",
        "expected": "248\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5",
        "expected": "5\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1",
        "expected": "1\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "8128",
        "expected": "4064\n",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l2-p4-prime-range",
    "title": "4. Prime number between range",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Write a program to print all prime numbers between a given range (start and end inclusive).</p>\n      <p>Numbers should be separated by a space.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>10\n20</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>11 13 17 19</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>1\n10</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>2 3 5 7</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>20\n30</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>23 29</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "10\n20",
        "expected": "11 13 17 19 \n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1\n10",
        "expected": "2 3 5 7 \n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "20\n30",
        "expected": "23 29 \n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "50\n60",
        "expected": "53 59 \n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "90\n100",
        "expected": "97 \n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2\n5",
        "expected": "2 3 5 \n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "10 20",
        "expected": "11 13 17 19 \n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1 10",
        "expected": "2 3 5 7 \n",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p5-harmonic-series",
    "title": "5. Harmonic Series",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Write a program to print the sum of the harmonic series up to N terms: 1 + 1/2 + 1/3 + ... + 1/N.</p>\n      <p>If N <= 0, print <code>Invalid input</code>. Format the output to 2 decimal places.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>5</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>2.28</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>1</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>1.00</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>10</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>2.93</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5",
        "expected": "2.28\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "1.00\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "10",
        "expected": "2.93\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "100",
        "expected": "5.19\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "0",
        "expected": "Invalid input\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "-5",
        "expected": "Invalid input\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "1.50\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3",
        "expected": "1.83",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p6-handshaking",
    "title": "6. Handshaking Theorem",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Write a program to calculate the total number of handshakes possible for N people.</p>\n      <p>If N < 2, print <code>At least 2 people are needed for a handshake.</code></p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>5</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>10</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>2</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>1</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>1</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>At least 2 people are needed for a handshake.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5",
        "expected": "10\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "1\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "At least 2 people are needed for a handshake.\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "10",
        "expected": "45\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "0",
        "expected": "At least 2 people are needed for a handshake.\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "100",
        "expected": "4950\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3",
        "expected": "3\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "7",
        "expected": "21",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p7-odd-even-sequence",
    "title": "7. Odd and Even Sequence",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Take an integer N. If N is odd, print odd numbers from 1 to N. If N is even, print even numbers from 2 to N. If N <= 0, print <code>Invalid input</code>.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>9</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>1 3 5 7 9</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>8</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>2 4 6 8</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>1</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>1</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "9",
        "expected": "1 3 5 7 9 ",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "8",
        "expected": "2 4 6 8 ",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "1 ",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "10",
        "expected": "2 4 6 8 10 ",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "0",
        "expected": "Invalid input\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "-3",
        "expected": "Invalid input\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "2 ",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3",
        "expected": "1 3 ",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p8-odd-even-sum",
    "title": "8. Odd and Even Number Sum",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>For a given integer N, print all even numbers strictly less than N, followed by their sum. Then, print all odd numbers strictly less than N, followed by their sum.</p>\n      <p>If N <= 0, print <code>Invalid input</code>.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>8</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Even numbers less than 8: 2 4 6 \nEven Sum = 12\nOdd numbers less than 8: 1 3 5 7 \nOdd Sum = 16</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>7</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Even numbers less than 7: 2 4 6 \nEven Sum = 12\nOdd numbers less than 7: 1 3 5 \nOdd Sum = 9</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>1</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Even numbers less than 1: \nEven Sum = 0\nOdd numbers less than 1: \nOdd Sum = 0</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "8",
        "expected": "Even numbers less than 8: 2 4 6 \nEven Sum = 12\nOdd numbers less than 8: 1 3 5 7 \nOdd Sum = 16\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "7",
        "expected": "Even numbers less than 7: 2 4 6 \nEven Sum = 12\nOdd numbers less than 7: 1 3 5 \nOdd Sum = 9\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "Even numbers less than 1: \nEven Sum = 0\nOdd numbers less than 1: \nOdd Sum = 0\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "10",
        "expected": "Even numbers less than 10: 2 4 6 8 \nEven Sum = 20\nOdd numbers less than 10: 1 3 5 7 9 \nOdd Sum = 25\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "0",
        "expected": "Invalid input\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "15",
        "expected": "Even numbers less than 15: 2 4 6 8 10 12 14 \nEven Sum = 56\nOdd numbers less than 15: 1 3 5 7 9 11 13 \nOdd Sum = 49\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "Even numbers less than 2: \nEven Sum = 0\nOdd numbers less than 2: 1 \nOdd Sum = 1\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3",
        "expected": "Even numbers less than 3: 2 \nEven Sum = 2\nOdd numbers less than 3: 1 \nOdd Sum = 1\n",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p9-odd-even-squares",
    "title": "9. Odd and Even Squares",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Take N as input. If N is even, print the squares of even numbers up to N. If N is odd, print the squares of odd numbers up to N. If N <= 0, print <code>Invalid input</code>.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>8</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>4 16 36 64</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>7</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>1 9 25 49</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>1</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>1</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "8",
        "expected": "4 16 36 64 ",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "7",
        "expected": "1 9 25 49 ",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "1 ",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "10",
        "expected": "4 16 36 64 100 ",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "0",
        "expected": "Invalid input\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "-5",
        "expected": "Invalid input\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "4 ",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3",
        "expected": "1 9 ",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p10-perfect-square",
    "title": "10. Perfect Square",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Check if a given number is a perfect square. If it is negative, print <code>Not a Perfect Square</code>.</p>\n      <p>Print <code>Perfect Square</code> if it is, otherwise <code>Not a Perfect Square</code>.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>25</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Perfect Square</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>10</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Not a Perfect Square</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>0</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Perfect Square</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "25",
        "expected": "Perfect Square\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "10",
        "expected": "Not a Perfect Square\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "0",
        "expected": "Perfect Square\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "Perfect Square\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "-4",
        "expected": "Not a Perfect Square\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "144",
        "expected": "Perfect Square\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "Not a Perfect Square\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "99",
        "expected": "Not a Perfect Square\n",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p11-pyramid-pattern",
    "title": "11. Pyramid Pattern",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Print a pyramid pattern of alphabets. Take N as the number of rows. Check valid input range (1 to 26), else print <code>Invalid input</code>.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>3</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>A\nAB\nABC</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>27</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Invalid input</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>5</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>A\nAB\nABC\nABCD\nABCDE</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "3",
        "expected": "A\nAB\nABC\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "5",
        "expected": "A\nAB\nABC\nABCD\nABCDE\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "27",
        "expected": "Invalid input\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "A\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "26",
        "expected": "A\nAB\nABC\nABCD\nABCDE\nABCDEF\nABCDEFG\nABCDEFGH\nABCDEFGHI\nABCDEFGHIJ\nABCDEFGHIJK\nABCDEFGHIJKL\nABCDEFGHIJKLM\nABCDEFGHIJKLMN\nABCDEFGHIJKLMNO\nABCDEFGHIJKLMNOP\nABCDEFGHIJKLMNOPQ\nABCDEFGHIJKLMNOPQR\nABCDEFGHIJKLMNOPQRS\nABCDEFGHIJKLMNOPQRST\nABCDEFGHIJKLMNOPQRSTU\nABCDEFGHIJKLMNOPQRSTUV\nABCDEFGHIJKLMNOPQRSTUVW\nABCDEFGHIJKLMNOPQRSTUVWX\nABCDEFGHIJKLMNOPQRSTUVWXY\nABCDEFGHIJKLMNOPQRSTUVWXYZ\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "0",
        "expected": "Invalid input\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "A\nAB\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "10",
        "expected": "A\nAB\nABC\nABCD\nABCDE\nABCDEF\nABCDEFG\nABCDEFGH\nABCDEFGHI\nABCDEFGHIJ\n",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p12-strong-number",
    "title": "12. Strong Number or Not",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Check if a number is a Strong number (sum of factorials of digits equals the number). If input is less than 0, print <code>Invalid input</code>.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>145</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Strong Number</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>123</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Not a Strong Number</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>-5</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Invalid input</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "145",
        "expected": "Strong Number\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "Strong Number\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "123",
        "expected": "Not a Strong Number\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "-5",
        "expected": "Invalid input\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "40585",
        "expected": "Strong Number\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "10",
        "expected": "Not a Strong Number\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "Strong Number\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "0",
        "expected": "Not a Strong Number\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "14",
        "expected": "Not a Strong Number\n",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p13-start-pattern",
    "title": "13. Start Pattern",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Write a program that takes two inputs: number of rows (N) and starting stars (S). If N <= 0 or S <= 0, print <code>Invalid input</code>. For odd rows, print S stars. For even rows, print S*2 stars.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>7\n3</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>***\n******\n***\n******\n***\n******\n***</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>4\n2</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>**\n****\n**\n****</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>1\n5</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>*****</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "7\n3",
        "expected": "***\n******\n***\n******\n***\n******\n***\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4\n2",
        "expected": "**\n****\n**\n****\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1\n5",
        "expected": "*****\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "0\n3",
        "expected": "Invalid input\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3\n0",
        "expected": "Invalid input\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\n1",
        "expected": "*\n**\n*\n**\n*\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6\n4",
        "expected": "****\n********\n****\n********\n****\n********\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2\n3",
        "expected": "***\n******",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p14-pattern-sum",
    "title": "14. Pattern Sum",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Write a program to generate a pattern of numbers starting from 9 and decreasing by 1 each time per row. Each row should start from 9 and contain one more digit than the previous row. After printing all the rows, print the sum of all the numbers formed in each row.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>3</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>1094</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>4</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>10970</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>1</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>9</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "3",
        "expected": "1094\n",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "4",
        "expected": "10970\n",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "1",
        "expected": "9\n",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "5",
        "expected": "109735\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "2",
        "expected": "107\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6",
        "expected": "1097389\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "0",
        "expected": "0\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "9",
        "expected": "1097393685\n",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l2-p15-remove-first-last-digit",
    "title": "15. Remove First and Last Digit",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Write a C program to remove the first and last digit of a number and print the result. If the number becomes 0 or invalid after removal, print 0.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>73627</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>362</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>12</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>0</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>123</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>2</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "73627",
        "expected": "362\n",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "12",
        "expected": "0\n",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "123",
        "expected": "2\n",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "9009",
        "expected": "0\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5",
        "expected": "0\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "87654321",
        "expected": "765432\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "100",
        "expected": "0\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1001",
        "expected": "0\n",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l2-p16-take-n-numbers",
    "title": "16. Multiply 1-digit or 2-digit numbers",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Take N numbers as input. If N <= 0, print <code>Invalid input</code>.</p>\n      <p>Only 1-digit or 2-digit numbers (0 to 99 and -99 to -1) should be included in the multiplication. Ignore numbers with 3 or more digits. If no valid numbers, print <code>0</code>.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>4\n2\n12\n123\n2</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>48</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>0</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Invalid input</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>3\n100\n-5\n10</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>-50</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "4\n2\n12\n123\n2",
        "expected": "48\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "0",
        "expected": "Invalid input\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3\n100\n-5\n10",
        "expected": "-50\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2\n1000\n-500",
        "expected": "0\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\n-1\n-2\n-3\n-4\n-5",
        "expected": "-120\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "-2",
        "expected": "Invalid input\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3\n0\n1\n2",
        "expected": "0\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4\n99\n-99\n100\n-100",
        "expected": "-9801",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p17-process-digits",
    "title": "17. Process Digits",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Process a number digit by digit from left to right. If the first digit is 9, skip printing it. For other digits, if the digit is 9, print 0, else print digit + 1.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>234</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>345</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>9876</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>987</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>934</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>45</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "234",
        "expected": "345",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "9876",
        "expected": "987",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "934",
        "expected": "45",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "999",
        "expected": "00",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "100",
        "expected": "211",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "9019",
        "expected": "120",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "9000",
        "expected": "111",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "9",
        "expected": "",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p18-perfect-cube",
    "title": "18. Perfect Cube Format",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Take N as input and print the cube format for N, N+1, and N+2.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>5</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>5*5*5 = 125\n6*6*6 = 216\n7*7*7 = 343</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>1</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>1*1*1 = 1\n2*2*2 = 8\n3*3*3 = 27</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>10</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>10*10*10 = 1000\n11*11*11 = 1331\n12*12*12 = 1728</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5",
        "expected": "5*5*5 = 125\n6*6*6 = 216\n7*7*7 = 343\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "1*1*1 = 1\n2*2*2 = 8\n3*3*3 = 27\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "10",
        "expected": "10*10*10 = 1000\n11*11*11 = 1331\n12*12*12 = 1728\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "0",
        "expected": "0*0*0 = 0\n1*1*1 = 1\n2*2*2 = 8\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "12",
        "expected": "12*12*12 = 1728\n13*13*13 = 2197\n14*14*14 = 2744\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "9",
        "expected": "9*9*9 = 729\n10*10*10 = 1000\n11*11*11 = 1331\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "-2",
        "expected": "-2*-2*-2 = -8\n-1*-1*-1 = -1\n0*0*0 = 0\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3",
        "expected": "3*3*3 = 27\n4*4*4 = 64\n5*5*5 = 125",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p19-multiples-pattern",
    "title": "19. Multiples of 5 Pattern",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Print a pattern containing multiples of 5, based on the input N.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>4</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>5 \n5 10 \n5 10 15 \n5 10 15 20</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>2</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>5 \n5 10</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>1</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>5</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "4",
        "expected": "5 \n5 10 \n5 10 15 \n5 10 15 20 \n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "5 \n5 10 \n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "5 \n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "5",
        "expected": "5 \n5 10 \n5 10 15 \n5 10 15 20 \n5 10 15 20 25 \n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6",
        "expected": "5 \n5 10 \n5 10 15 \n5 10 15 20 \n5 10 15 20 25 \n5 10 15 20 25 30 \n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "0",
        "expected": "",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "10",
        "expected": "5 \n5 10 \n5 10 15 \n5 10 15 20 \n5 10 15 20 25 \n5 10 15 20 25 30 \n5 10 15 20 25 30 35 \n5 10 15 20 25 30 35 40 \n5 10 15 20 25 30 35 40 45 \n5 10 15 20 25 30 35 40 45 50 \n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3",
        "expected": "5 \n5 10 \n5 10 15",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p20-repeated-digits",
    "title": "20. Sum of Repeated Digits",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Given a digit and a count, calculate the sum of terms formed by repeating the digit.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>3\n5</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>37035</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>1\n4</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>1234</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>5\n3</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>615</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "3\n5",
        "expected": "37035\n",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "1\n4",
        "expected": "1234\n",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "5\n3",
        "expected": "615\n",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "9\n2",
        "expected": "108\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "2\n6",
        "expected": "246912\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "7\n1",
        "expected": "7\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "3 5",
        "expected": "37035\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1 4",
        "expected": "1234\n",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l2-p21-collatz-steps",
    "title": "21. Bitwise Collatz Steps",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Count the number of steps required to reach 1 for a given integer N using the Collatz conjecture logic (modified using bitwise operations).</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>6</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>8</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>3</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>7</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>10</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>6</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "6",
        "expected": "8\n",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3",
        "expected": "7\n",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "10",
        "expected": "6\n",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "16",
        "expected": "4\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "27",
        "expected": "111\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "11",
        "expected": "14\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1",
        "expected": "0\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "2",
        "expected": "1\n",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "prime-range",
    "title": "22. Prime number with ranges",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Write a program to print all prime numbers between a given range (start and end inclusive).</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>10 20</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>11 13 17 19</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>1 10</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>2 3 5 7</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>20 30</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>23 29</pre>",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "10 20",
        "expected": "11 13 17 19",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "1 10",
        "expected": "2 3 5 7",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "20 30",
        "expected": "23 29",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "1 2",
        "expected": "2",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "2 2",
        "expected": "2",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "30 50",
        "expected": "31 37 41 43 47",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "50 60",
        "expected": "53 59",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "90 100",
        "expected": "97",
        "hidden": true,
        "matchType": "numeric"
      }
    ],
    "functionName": "main"
  },
  {
    "id": "collatz-sequence",
    "title": "23. Collatz sequence",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Print the Collatz sequence for a given number N. The sequence stops when it reaches 1.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>6</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>6 3 10 5 16 8 4 2 1</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>3</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>3 10 5 16 8 4 2 1</pre>",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "6",
        "expected": "6 3 10 5 16 8 4 2 1",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3",
        "expected": "3 10 5 16 8 4 2 1",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "1",
        "expected": "1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "2",
        "expected": "2 1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "7",
        "expected": "7 22 11 34 17 52 26 13 40 20 10 5 16 8 4 2 1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "10",
        "expected": "10 5 16 8 4 2 1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "27",
        "expected": "27 82 41 124 62 31 94 47 142 71 214 107 322 161 484 242 121 364 182 91 274 137 412 206 103 310 155 466 233 700 350 175 526 263 790 395 1186 593 1780 890 445 1336 668 334 167 502 251 754 377 1132 566 283 850 425 1276 638 319 958 479 1438 719 2158 1079 3238 1619 4858 2429 7288 3644 1822 911 2734 1367 4102 2051 6154 3077 9232 4616 2308 1154 577 1732 866 433 1300 650 325 976 488 244 122 61 184 92 46 23 70 35 106 53 160 80 40 20 10 5 16 8 4 2 1",
        "hidden": true,
        "matchType": "numeric"
      }
    ],
    "functionName": "main"
  },
  {
    "id": "harshad-number",
    "title": "24. Harshad Number",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Check if a number is a Harshad Number (divisible by the sum of its digits).</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>18</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Harshad Number</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>19</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Not a Harshad Number</pre>",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "18",
        "expected": "Harshad Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "19",
        "expected": "Not a Harshad Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "5",
        "expected": "Harshad Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "12",
        "expected": "Harshad Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "13",
        "expected": "Not a Harshad Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1000",
        "expected": "Harshad Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "22",
        "expected": "Not a Harshad Number",
        "hidden": true,
        "matchType": "normalized"
      }
    ],
    "functionName": "main"
  },
  {
    "id": "product-of-digit",
    "title": "25. Product of a digit",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Calculate the product of digits of a given number.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>123</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>6</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>45</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>20</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>0</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>0</pre>",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "123",
        "expected": "6",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "45",
        "expected": "20",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "0",
        "expected": "0",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "7",
        "expected": "7",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "10",
        "expected": "0",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "999",
        "expected": "729",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "25",
        "expected": "10",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1005",
        "expected": "0",
        "hidden": true,
        "matchType": "numeric"
      }
    ],
    "functionName": "main"
  },
  {
    "id": "strong-number",
    "title": "26. Strong number",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Check if a number is a Strong number (sum of factorials of digits equals the number).</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>145</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Strong Number</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>123</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Not a Strong Number</pre>",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "145",
        "expected": "Strong Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "123",
        "expected": "Not a Strong Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "Strong Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "Strong Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "40585",
        "expected": "Strong Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "146",
        "expected": "Not a Strong Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "999",
        "expected": "Not a Strong Number",
        "hidden": true,
        "matchType": "normalized"
      }
    ],
    "functionName": "main"
  },
  {
    "id": "palindrome-number",
    "title": "27. Palindrome or not",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Check if a given number is a Palindrome.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>121</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Palindrome</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>123</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Not a Palindrome</pre>",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "121",
        "expected": "Palindrome",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "123",
        "expected": "Not a Palindrome",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "7",
        "expected": "Palindrome",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1221",
        "expected": "Palindrome",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "10",
        "expected": "Not a Palindrome",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "12321",
        "expected": "Palindrome",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "12345",
        "expected": "Not a Palindrome",
        "hidden": true,
        "matchType": "normalized"
      }
    ],
    "functionName": "main"
  },
  {
    "id": "armstrong-number",
    "title": "28. Armstrong number",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Check if a given number is an Armstrong number (sum of its own digits raised to the power of the number of digits equals the number).</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>153</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Armstrong Number</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>123</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Not an Armstrong Number</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>9474</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Armstrong Number</pre>",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "153",
        "expected": "Armstrong Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "123",
        "expected": "Not an Armstrong Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "9474",
        "expected": "Armstrong Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "Armstrong Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "370",
        "expected": "Armstrong Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "371",
        "expected": "Armstrong Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1634",
        "expected": "Armstrong Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "100",
        "expected": "Not an Armstrong Number",
        "hidden": true,
        "matchType": "normalized"
      }
    ],
    "functionName": "main"
  },
  {
    "id": "twin-primes",
    "title": "29. Twin Primes",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Check if two given numbers are Twin Primes (both are prime and their absolute difference is 2).</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>3 5</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Twin Primes</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>7 9</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Not Twin Primes</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>5 7</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Twin Primes</pre>",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "3 5",
        "expected": "Twin Primes",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "5 7",
        "expected": "Twin Primes",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "7 9",
        "expected": "Not Twin Primes",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "11 13",
        "expected": "Twin Primes",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "13 11",
        "expected": "Twin Primes",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "17 19",
        "expected": "Twin Primes",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2 3",
        "expected": "Not Twin Primes",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4 6",
        "expected": "Not Twin Primes",
        "hidden": true,
        "matchType": "normalized"
      }
    ],
    "functionName": "main"
  },
  {
    "id": "working-with-character",
    "title": "30. Working with character",
    "difficulty": "Easy",
    "level": 2,
    "description": "<p>Read a character and check if it is a vowel or consonant.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>a</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Vowel</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>b</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Consonant</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>E</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Vowel</pre>",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "a",
        "expected": "Vowel",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "b",
        "expected": "Consonant",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "E",
        "expected": "Vowel",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "o",
        "expected": "Vowel",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "U",
        "expected": "Vowel",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "z",
        "expected": "Consonant",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "i",
        "expected": "Vowel",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "T",
        "expected": "Consonant",
        "hidden": true,
        "matchType": "normalized"
      }
    ],
    "functionName": "main"
  },
  {
    "id": "pattern-stars",
    "title": "31. Pattern",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Print a right-angled triangle pattern of stars with N rows.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>3</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>*\n**\n***</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>5</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>*\n**\n***\n****\n*****</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>2</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>*\n**</pre>",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "3",
        "expected": "*\n**\n***",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "5",
        "expected": "*\n**\n***\n****\n*****",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "*\n**",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "*",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4",
        "expected": "*\n**\n***\n****",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6",
        "expected": "*\n**\n***\n****\n*****\n******",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "7",
        "expected": "*\n**\n***\n****\n*****\n******\n*******",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "10",
        "expected": "*\n**\n***\n****\n*****\n******\n*******\n********\n*********\n**********",
        "hidden": true,
        "matchType": "normalized"
      }
    ],
    "functionName": "main"
  },
  {
    "id": "sum-of-digits",
    "title": "32. Sum of a digit",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Calculate the sum of digits of a given number.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>123</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>6</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>456</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>15</pre>",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "123",
        "expected": "6",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "456",
        "expected": "15",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "5",
        "expected": "5",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1000",
        "expected": "1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "99999",
        "expected": "45",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1000000",
        "expected": "1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "908172",
        "expected": "27",
        "hidden": true,
        "matchType": "numeric"
      }
    ],
    "functionName": "main"
  },
  {
    "id": "fibonacci-series",
    "title": "33. Fibonacci Series",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Generate the first <strong>N</strong> terms of the Fibonacci series.</p>\n      <p>In a Fibonacci series, the next number is the sum of the two preceding ones. The sequence starts with 0 and 1.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>5</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>0 1 1 2 3</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>1</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>0</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>7</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>0 1 1 2 3 5 8</pre>",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5",
        "expected": "0 1 1 2 3",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "1",
        "expected": "0",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "7",
        "expected": "0 1 1 2 3 5 8",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "2",
        "expected": "0 1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "3",
        "expected": "0 1 1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "10",
        "expected": "0 1 1 2 3 5 8 13 21 34",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "12",
        "expected": "0 1 1 2 3 5 8 13 21 34 55 89",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "20",
        "expected": "0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 2584 4181",
        "hidden": true,
        "matchType": "numeric"
      }
    ],
    "functionName": "main"
  },
  {
    "id": "l2-p22-alphabet-pattern-1",
    "title": "34. Alphabet Pattern 1",
    "difficulty": "Easy",
    "level": 2,
    "description": "Print a right-angled triangle pattern of alphabets where each row starts with 'A' and increments up to the row number.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>A\nA B\nA B C\nA B C D\nA B C D E</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>A\nA B\nA B C</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5",
        "expected": "A\nA B\nA B C\nA B C D\nA B C D E",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3",
        "expected": "A\nA B\nA B C",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4",
        "expected": "A\nA B\nA B C\nA B C D",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "A",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "A\nA B",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6",
        "expected": "A\nA B\nA B C\nA B C D\nA B C D E\nA B C D E F",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "26",
        "expected": "A\nA B\nA B C\nA B C D\nA B C D E\nA B C D E F\nA B C D E F G\nA B C D E F G H\nA B C D E F G H I\nA B C D E F G H I J\nA B C D E F G H I J K\nA B C D E F G H I J K L\nA B C D E F G H I J K L M\nA B C D E F G H I J K L M N\nA B C D E F G H I J K L M N O\nA B C D E F G H I J K L M N O P\nA B C D E F G H I J K L M N O P Q\nA B C D E F G H I J K L M N O P Q R\nA B C D E F G H I J K L M N O P Q R S\nA B C D E F G H I J K L M N O P Q R S T\nA B C D E F G H I J K L M N O P Q R S T U\nA B C D E F G H I J K L M N O P Q R S T U V\nA B C D E F G H I J K L M N O P Q R S T U V W\nA B C D E F G H I J K L M N O P Q R S T U V W X\nA B C D E F G H I J K L M N O P Q R S T U V W X Y\nA B C D E F G H I J K L M N O P Q R S T U V W X Y Z",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p23-alphabet-pattern-2",
    "title": "35. Alphabet Pattern 2",
    "difficulty": "Easy",
    "level": 2,
    "description": "Print a right-angled triangle pattern of alphabets where each row consists of a single alphabet repeated.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>4</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>A\nB B\nC C C\nD D D D</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>A\nB B\nC C C</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "4",
        "expected": "A\nB B\nC C C\nD D D D",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3",
        "expected": "A\nB B\nC C C",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "5",
        "expected": "A\nB B\nC C C\nD D D D\nE E E E E",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "A",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "A\nB B",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "7",
        "expected": "A\nB B\nC C C\nD D D D\nE E E E E\nF F F F F F\nG G G G G G G",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "26",
        "expected": "A\nB B\nC C C\nD D D D\nE E E E E\nF F F F F F\nG G G G G G G\nH H H H H H H H\nI I I I I I I I I\nJ J J J J J J J J J\nK K K K K K K K K K K\nL L L L L L L L L L L L\nM M M M M M M M M M M M M\nN N N N N N N N N N N N N N\nO O O O O O O O O O O O O O O\nP P P P P P P P P P P P P P P P\nQ Q Q Q Q Q Q Q Q Q Q Q Q Q Q Q Q\nR R R R R R R R R R R R R R R R R R\nS S S S S S S S S S S S S S S S S S S\nT T T T T T T T T T T T T T T T T T T T\nU U U U U U U U U U U U U U U U U U U U U\nV V V V V V V V V V V V V V V V V V V V V V\nW W W W W W W W W W W W W W W W W W W W W W W\nX X X X X X X X X X X X X X X X X X X X X X X X\nY Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y Y\nZ Z Z Z Z Z Z Z Z Z Z Z Z Z Z Z Z Z Z Z Z Z Z Z Z Z",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p24-custom-patterns",
    "title": "36. Custom Patterns",
    "difficulty": "Medium",
    "level": 2,
    "description": "Print a custom pattern of stars. The program takes two inputs: `n` and `stars`. If the row index `i` (0-indexed) is even, print `stars * 2` stars. If `i` is odd, print `stars` stars.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>2 5</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>* * * * * * * * * *\n* * * * *</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3 3</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>* * * * * *\n* * *\n* * * * * *</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "2 5",
        "expected": "* * * * * * * * * *\n* * * * *",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3 3",
        "expected": "* * * * * *\n* * *\n* * * * * *",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4 2",
        "expected": "* * * *\n* *\n* * * *\n* *",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1 4",
        "expected": "* * * * * * * *",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5 1",
        "expected": "* *\n*\n* *\n*\n* *",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3 7",
        "expected": "* * * * * * * * * * * * * *\n* * * * * * *\n* * * * * * * * * * * * * *",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6 3",
        "expected": "* * * * * *\n* * *\n* * * * * *\n* * *\n* * * * * *\n* * *",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p25-reverse-alphabet",
    "title": "37. Reverse of the Alphabet",
    "difficulty": "Easy",
    "level": 2,
    "description": "Take an integer `n` and print the last `n` characters of the alphabet in reverse order starting from 'Z'.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Z Y X W V</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Z Y X</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5",
        "expected": "Z Y X W V",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3",
        "expected": "Z Y X",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "7",
        "expected": "Z Y X W V U T",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "Z",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "Z Y",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "10",
        "expected": "Z Y X W V U T S R Q",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "26",
        "expected": "Z Y X W V U T S R Q P O N M L K J I H G F E D C B A",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p26-armstrong-ranges",
    "title": "38. Armstrong Number with Specific Ranges",
    "difficulty": "Medium",
    "level": 2,
    "description": "Given a range `s` to `e`, print all Armstrong numbers within that range.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>1 10000</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>1 2 3 4 5 6 7 8 9 153 370 371 407 1634 8208 9474</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>1 200</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>1 2 3 4 5 6 7 8 9 153</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "1 10000",
        "expected": "1 2 3 4 5 6 7 8 9 153 370 371 407 1634 8208 9474",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "1 200",
        "expected": "1 2 3 4 5 6 7 8 9 153",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "300 400",
        "expected": "370 371",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1 1000",
        "expected": "1 2 3 4 5 6 7 8 9 153 370 371 407",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "150 160",
        "expected": "153",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1000 2000",
        "expected": "1634",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "400 500",
        "expected": "407",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l2-p27-prime-factors",
    "title": "39. Prime Factors",
    "difficulty": "Medium",
    "level": 2,
    "description": "Given an integer `n`, print all its unique prime factors.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>315</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>3 5 7</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>20</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>2 5</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "315",
        "expected": "3 5 7",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "20",
        "expected": "2 5",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "13",
        "expected": "13",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "2",
        "expected": "2",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "49",
        "expected": "7",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "100",
        "expected": "2 5",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "30030",
        "expected": "2 3 5 7 11 13",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l2-p28-desired-pattern",
    "title": "40. Desired Pattern",
    "difficulty": "Medium",
    "level": 2,
    "description": "Print a triangle pattern given a row count and two characters. The elements alternate between the second character and the first character.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>4 # $</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>$\n$ #\n$ # $\n$ # $ #</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3 A B</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>B\nB A\nB A B</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "4 # $",
        "expected": "$\n$ #\n$ # $\n$ # $ #",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3 A B",
        "expected": "B\nB A\nB A B",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "5 * -",
        "expected": "-\n- *\n- * -\n- * - *\n- * - * -",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1 X Y",
        "expected": "Y",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2 p q",
        "expected": "q\nq p",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6 a b",
        "expected": "b\nb a\nb a b\nb a b a\nb a b a b\nb a b a b a",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3 @ %",
        "expected": "%\n% @\n% @ %",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p29-swap-last-two",
    "title": "41. Swap the Last 2 Digit",
    "difficulty": "Medium",
    "level": 2,
    "description": "Given two integers, swap their last digits and print the new values.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>73 46</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>76 43</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>105 208</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>108 205</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "73 46",
        "expected": "76 43",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "105 208",
        "expected": "108 205",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "10 20",
        "expected": "10 20",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "12 34",
        "expected": "14 32",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5 7",
        "expected": "7 5",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "100 200",
        "expected": "100 200",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "999 111",
        "expected": "991 119",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l2-p30-prime-range-analytics",
    "title": "42. Prime Range Analytics for Network Security",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>In a secure communication system, packet IDs are generated continuously. Cybersecurity researchers observed that prime-numbered packet IDs are less likely to collide and are often used in encryption mechanisms. You are tasked with building a module that scans a given range of packet IDs and identifies all prime numbers. The system should also report how many such secure packet IDs exist in the given range.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>Two integers: <code>start</code> and <code>end</code>.</p>\n<br/>\n<p><strong>Output:</strong></p>\n<p>All prime numbers in the range preceded by <code>Prime Numbers: </code> and total count of primes on a new line preceded by <code>Count: </code>.</p>\n<br/>\n<p><strong>Sample Input:</strong></p>\n<pre>10 20</pre>\n<p><strong>Sample Output:</strong></p>\n<pre>Prime Numbers: 11 13 17 19 \nCount: 4</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "10 20",
        "expected": "Prime Numbers: 11 13 17 19 \nCount: 4",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1 10",
        "expected": "Prime Numbers: 2 3 5 7 \nCount: 4",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "20 30",
        "expected": "Prime Numbers: 23 29 \nCount: 2",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "14 16",
        "expected": "Prime Numbers: \nCount: 0",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2 2",
        "expected": "Prime Numbers: 2 \nCount: 1",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "70 80",
        "expected": "Prime Numbers: 71 73 79 \nCount: 3",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "90 100",
        "expected": "Prime Numbers: 97 \nCount: 1",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "30 50",
        "expected": "Prime Numbers: 31 37 41 43 47 \nCount: 5",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p31-armstrong-detection",
    "title": "43. Armstrong Number Detection in Scientific Data",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>A scientific computing application processes large sets of numerical data. Certain numbers, known as Armstrong numbers, have unique mathematical properties and are flagged for further analysis. An Armstrong number of <em>k</em> digits is an integer such that the sum of its digits each raised to the power of <em>k</em> equals the number itself. Your task is to develop a program that determines whether a given number belongs to this special category.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>An integer <code>n</code>.</p>\n<br/>\n<p><strong>Output:</strong></p>\n<p>Print <code>Armstrong Number</code> or <code>Not Armstrong Number</code>.</p>\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>153</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Armstrong Number</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>120</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Not Armstrong Number</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "153",
        "expected": "Armstrong Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "120",
        "expected": "Not Armstrong Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "370",
        "expected": "Armstrong Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "371",
        "expected": "Armstrong Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "407",
        "expected": "Armstrong Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1634",
        "expected": "Armstrong Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "8208",
        "expected": "Armstrong Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "9474",
        "expected": "Armstrong Number",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p32-strong-number-validation",
    "title": "44. Strong Number Validation for Secure Tokens",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>A fintech company generates secure tokens for transactions. A number is considered strong if the sum of the factorials of its digits equals the number itself. Such numbers are rare and used as validation markers. You are asked to implement a validation system to check whether a given token is strong.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>An integer <code>n</code>.</p>\n<br/>\n<p><strong>Output:</strong></p>\n<p>Print <code>Strong Number</code> or <code>Not Strong Number</code>.</p>\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>145</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Strong Number</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>123</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Not Strong Number</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "145",
        "expected": "Strong Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "123",
        "expected": "Not Strong Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "Strong Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "Strong Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "40585",
        "expected": "Strong Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "10",
        "expected": "Not Strong Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "45",
        "expected": "Not Strong Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "500",
        "expected": "Not Strong Number",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p33-gcd-lcm-calculation",
    "title": "45. GCD & LCM Calculation for Resource Allocation",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>In a distributed system, tasks must be scheduled in repeating cycles. To optimize synchronization, the system needs to calculate:</p>\n<ul>\n  <li><strong>GCD (Greatest Common Divisor):</strong> for shared cycle alignment</li>\n  <li><strong>LCM (Least Common Multiple):</strong> for total cycle repetition</li>\n</ul>\n<p>You are assigned to build this calculation module.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>Two integers <code>a</code> and <code>b</code>.</p>\n<br/>\n<p><strong>Output:</strong></p>\n<pre>GCD: &lt;gcd&gt;\nLCM: &lt;lcm&gt;</pre>\n<br/>\n<p><strong>Sample Input:</strong></p>\n<pre>12 18</pre>\n<p><strong>Sample Output:</strong></p>\n<pre>GCD: 6\nLCM: 36</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "12 18",
        "expected": "GCD: 6\nLCM: 36",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "15 25",
        "expected": "GCD: 5\nLCM: 75",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "7 13",
        "expected": "GCD: 1\nLCM: 91",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "24 60",
        "expected": "GCD: 12\nLCM: 120",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "8 32",
        "expected": "GCD: 8\nLCM: 32",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "100 150",
        "expected": "GCD: 50\nLCM: 300",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "17 17",
        "expected": "GCD: 17\nLCM: 17",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "48 180",
        "expected": "GCD: 12\nLCM: 720",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p34-perfect-number-identification",
    "title": "46. Perfect Number Identification in Mathematical Research",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>A research lab is studying rare number classifications. A number is called <em>perfect</em> if the sum of its proper positive divisors (excluding the number itself) equals the number itself. You need to develop a system that verifies whether a given number belongs to this rare category.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>An integer <code>n</code>.</p>\n<br/>\n<p><strong>Output:</strong></p>\n<p>Print <code>Perfect Number</code> or <code>Not Perfect Number</code>.</p>\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>28</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Perfect Number</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>12</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Not Perfect Number</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "28",
        "expected": "Perfect Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "12",
        "expected": "Not Perfect Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "6",
        "expected": "Perfect Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "496",
        "expected": "Perfect Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "8128",
        "expected": "Perfect Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "Not Perfect Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "100",
        "expected": "Not Perfect Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "15",
        "expected": "Not Perfect Number",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p35-symmetric-pyramid-pattern",
    "title": "47. Symmetric Pyramid Pattern Generator",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>A digital signage system is used in events to display symmetric number patterns for visual appeal. The system must dynamically generate a centered pyramid pattern based on user input <code>n</code>, where each row <code>i</code> increases numbers forward from 1 to <code>i</code> and then mirrors backward to 1.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>An integer <code>n</code> (number of rows).</p>\n<br/>\n<p><strong>Output:</strong></p>\n<p>Centered numeric pyramid.</p>\n<br/>\n<p><strong>Sample Input:</strong></p>\n<pre>4</pre>\n<p><strong>Sample Output:</strong></p>\n<pre>   1\n  121\n 12321\n1234321</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "4",
        "expected": "   1\n  121\n 12321\n1234321",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "1",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": " 1\n121",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3",
        "expected": "  1\n 121\n12321",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5",
        "expected": "    1\n   121\n  12321\n 1234321\n123454321",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6",
        "expected": "     1\n    121\n   12321\n  1234321\n 123454321\n12345654321",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "7",
        "expected": "1\n     121\n    12321\n   1234321\n  123454321\n 12345654321\n1234567654321",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "8",
        "expected": "1\n      121\n     12321\n    1234321\n   123454321\n  12345654321\n 1234567654321\n123456787654321",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p36-binary-to-decimal",
    "title": "48. Binary to Decimal Converter (Embedded Systems)",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>An embedded system receives binary data from sensors. It must convert the binary number into decimal format for processing.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>An integer representing a binary number.</p>\n<br/>\n<p><strong>Output:</strong></p>\n<p>Print <code>Decimal: &lt;value&gt;</code>.</p>\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>1010</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Decimal: 10</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>1111</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Decimal: 15</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "1010",
        "expected": "Decimal: 10",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1111",
        "expected": "Decimal: 15",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "0",
        "expected": "Decimal: 0",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "Decimal: 1",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "10000",
        "expected": "Decimal: 16",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "11011",
        "expected": "Decimal: 27",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "101010",
        "expected": "Decimal: 42",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1111111",
        "expected": "Decimal: 127",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p37-decimal-to-binary",
    "title": "49. Decimal to Binary Converter",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>A system needs to convert user-entered decimal values into binary for low-level processing.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>An integer <code>n</code>.</p>\n<br/>\n<p><strong>Output:</strong></p>\n<p>Print <code>Binary: &lt;binary_value&gt;</code>.</p>\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>10</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Binary: 1010</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>0</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Binary: 0</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "10",
        "expected": "Binary: 1010",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "0",
        "expected": "Binary: 0",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "Binary: 1",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "15",
        "expected": "Binary: 1111",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "16",
        "expected": "Binary: 10000",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "27",
        "expected": "Binary: 11011",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "42",
        "expected": "Binary: 101010",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "64",
        "expected": "Binary: 1000000",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p38-palindrome-data-streams",
    "title": "50. Palindrome Detection in Data Streams",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>A data analytics system identifies symmetrical numeric patterns in datasets for compression optimization. Palindromic numbers are of special interest. You must design a module that scans a given range and prints all palindrome numbers separated by spaces.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>Two integers: <code>start</code> and <code>end</code>.</p>\n<br/>\n<p><strong>Output:</strong></p>\n<p>All palindrome numbers in the range separated by a space.</p>\n<br/>\n<p><strong>Sample Input:</strong></p>\n<pre>100 150</pre>\n<p><strong>Sample Output:</strong></p>\n<pre>101 111 121 131 141</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "100 150",
        "expected": "101 111 121 131 141",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "10 30",
        "expected": "11 22",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1 9",
        "expected": "1 2 3 4 5 6 7 8 9",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "120 130",
        "expected": "121",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "200 225",
        "expected": "202 212 222",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "50 65",
        "expected": "55",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "300 350",
        "expected": "303 313 323 333 343",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "90 100",
        "expected": "99",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p39-harmonic-series-engine",
    "title": "51. Harmonic Series Computation Engine",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>In physics simulations and numerical methods, harmonic series calculations are frequently used. The system must compute the sum up to <code>n</code> terms with precision: <code>1 + 1/2 + 1/3 + ... + 1/n</code>.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>An integer <code>n</code>.</p>\n<br/>\n<p><strong>Output:</strong></p>\n<p>Print <code>Sum: &lt;value&gt;</code> formatted to 2 decimal places.</p>\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Sum: 2.28</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>1</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Sum: 1.00</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5",
        "expected": "Sum: 2.28",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "Sum: 1.00",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "Sum: 1.50",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3",
        "expected": "Sum: 1.83",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4",
        "expected": "Sum: 2.08",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "10",
        "expected": "Sum: 2.93",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "20",
        "expected": "Sum: 3.60",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "50",
        "expected": "Sum: 4.50",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p40-hollow-structure",
    "title": "52. Hollow Structure Generator for UI Layout",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Modern UI frameworks use hollow structures for minimalistic design. You need to generate a hollow square pattern of asterisks dynamically based on input size <code>n</code>.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>An integer <code>n</code>.</p>\n<br/>\n<p><strong>Output:</strong></p>\n<p>Hollow square pattern of size <code>n &times; n</code>.</p>\n<br/>\n<p><strong>Sample Input:</strong></p>\n<pre>5</pre>\n<p><strong>Sample Output:</strong></p>\n<pre>*****\n*   *\n*   *\n*   *\n*****</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5",
        "expected": "*****\n*   *\n*   *\n*   *\n*****",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3",
        "expected": "***\n* *\n***",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4",
        "expected": "****\n*  *\n*  *\n****",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "**\n**",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6",
        "expected": "******\n*    *\n*    *\n*    *\n*    *\n******",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "7",
        "expected": "*******\n*     *\n*     *\n*     *\n*     *\n*     *\n*******",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "8",
        "expected": "********\n*      *\n*      *\n*      *\n*      *\n*      *\n*      *\n********",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "*",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p41-diamond-pattern-renderer",
    "title": "53. Diamond Pattern Renderer for Graphics System",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>A graphical subsystem generates symmetric shapes for visual elements like badges and icons. One such pattern is the diamond. Given an integer <code>n</code>, print a centered diamond pattern having <code>2n - 1</code> rows.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>An integer <code>n</code>.</p>\n<br/>\n<p><strong>Output:</strong></p>\n<p>Centered diamond pattern.</p>\n<br/>\n<p><strong>Sample Input:</strong></p>\n<pre>4</pre>\n<p><strong>Sample Output:</strong></p>\n<pre>   *\n  ***\n *****\n*******\n *****\n  ***\n   *</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "4",
        "expected": "   *\n  ***\n *****\n*******\n *****\n  ***\n   *",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "*",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": " *\n***\n *",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3",
        "expected": "  *\n ***\n*****\n ***\n  *",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5",
        "expected": "    *\n   ***\n  *****\n *******\n*********\n *******\n  *****\n   ***\n    *",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6",
        "expected": "*\n    ***\n   *****\n  *******\n *********\n***********\n *********\n  *******\n   *****\n    ***\n     *",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "7",
        "expected": "*\n     ***\n    *****\n   *******\n  *********\n ***********\n*************\n ***********\n  *********\n   *******\n    *****\n     ***\n      *",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "8",
        "expected": "*\n      ***\n     *****\n    *******\n   *********\n  ***********\n *************\n***************\n *************\n  ***********\n   *********\n    *******\n     *****\n      ***\n       *",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p42-harshad-number-financial",
    "title": "54. Harshad Number Detection in Financial Systems",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>In financial analytics, certain numbers are used for checksum validation and divisibility testing. A number is called a Harshad (or Niven) number if it is divisible by the sum of its digits. You are building a validation module that determines whether a transaction ID satisfies this property before further processing.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>An integer <code>n</code>.</p>\n<br/>\n<p><strong>Output:</strong></p>\n<p>Print <code>Harshad Number</code> or <code>Not Harshad Number</code>.</p>\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>18</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Harshad Number</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>19</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Not Harshad Number</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "18",
        "expected": "Harshad Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "19",
        "expected": "Not Harshad Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "21",
        "expected": "Harshad Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "24",
        "expected": "Harshad Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "156",
        "expected": "Harshad Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "157",
        "expected": "Not Harshad Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "Harshad Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "100",
        "expected": "Harshad Number",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p43-factorial-series-computation",
    "title": "55. Factorial Series Computation for Scientific Models",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>In computational mathematics and simulations, factorial-based series are widely used for approximations and probability models. You are tasked with computing the sum of the series: <code>1! + 2! + 3! + ... + n!</code> based on user input.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>An integer <code>n</code>.</p>\n<br/>\n<p><strong>Output:</strong></p>\n<p>Print <code>Sum: &lt;sum&gt;</code>.</p>\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>4</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Sum: 33</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>1</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Sum: 1</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "4",
        "expected": "Sum: 33",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "Sum: 1",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "Sum: 3",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3",
        "expected": "Sum: 9",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5",
        "expected": "Sum: 153",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6",
        "expected": "Sum: 873",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "7",
        "expected": "Sum: 5913",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "8",
        "expected": "Sum: 46233",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p44-twin-prime-cryptography",
    "title": "56. Twin Prime Identification in Cryptography",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>In cryptography, twin primes (pairs of prime numbers differing by 2) are useful in key generation and number theory research. You are asked to develop a module that scans a range <code>[start, end]</code> and identifies all twin prime pairs <code>(p, p + 2)</code>.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>Two integers: <code>start</code> and <code>end</code>.</p>\n<br/>\n<p><strong>Output:</strong></p>\n<p>Print each twin prime pair on a separate line in the format <code>(p1, p2)</code>.</p>\n<br/>\n<p><strong>Sample Input:</strong></p>\n<pre>10 30</pre>\n<p><strong>Sample Output:</strong></p>\n<pre>(11, 13)\n(17, 19)</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "10 30",
        "expected": "(11, 13)\n(17, 19)",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1 20",
        "expected": "(3, 5)\n(5, 7)\n(11, 13)\n(17, 19)",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "25 45",
        "expected": "(29, 31)\n(41, 43)",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "50 70",
        "expected": "(59, 61)",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "14 16",
        "expected": "",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "70 100",
        "expected": "(71, 73)",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "100 120",
        "expected": "(101, 103)\n(107, 109)",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "120 150",
        "expected": "(137, 139)",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p45-pascals-triangle",
    "title": "57. Pascal’s Triangle for Combinatorics Engine",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>Pascal’s Triangle is widely used in probability, combinatorics, and binomial expansions. You are tasked with building a system that generates Pascal’s Triangle up to <code>n</code> rows for mathematical analysis.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>An integer <code>n</code>.</p>\n<br/>\n<p><strong>Output:</strong></p>\n<p>Pascal’s Triangle up to <code>n</code> rows where each value in a row is followed by a space.</p>\n<br/>\n<p><strong>Sample Input:</strong></p>\n<pre>5</pre>\n<p><strong>Sample Output:</strong></p>\n<pre>1 \n1 1 \n1 2 1 \n1 3 3 1 \n1 4 6 4 1 </pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5",
        "expected": "1 \n1 1 \n1 2 1 \n1 3 3 1 \n1 4 6 4 1 ",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "1 ",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "1 \n1 1 ",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3",
        "expected": "1 \n1 1 \n1 2 1 ",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4",
        "expected": "1 \n1 1 \n1 2 1 \n1 3 3 1 ",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6",
        "expected": "1 \n1 1 \n1 2 1 \n1 3 3 1 \n1 4 6 4 1 \n1 5 10 10 5 1 ",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "7",
        "expected": "1 \n1 1 \n1 2 1 \n1 3 3 1 \n1 4 6 4 1 \n1 5 10 10 5 1 \n1 6 15 20 15 6 1",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "8",
        "expected": "1 \n1 1 \n1 2 1 \n1 3 3 1 \n1 4 6 4 1 \n1 5 10 10 5 1 \n1 6 15 20 15 6 1 \n1 7 21 35 35 21 7 1",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p46-digit-frequency",
    "title": "58. Digit Frequency Analysis for Data Processing",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>In data analytics, it is often required to understand the distribution of digits within a number (e.g., transaction IDs, encoded values). You are asked to count how many times each digit appears in a given number and print digits 0 through 9 that appear at least once.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>An integer <code>n</code>.</p>\n<br/>\n<p><strong>Output:</strong></p>\n<p>Print the frequency of each present digit in the format <code>&lt;digit&gt; -&gt; &lt;count&gt;</code> on separate lines in ascending order of digit (0 to 9).</p>\n<br/>\n<p><strong>Sample Input:</strong></p>\n<pre>122333</pre>\n<p><strong>Sample Output:</strong></p>\n<pre>1 -&gt; 1\n2 -&gt; 2\n3 -&gt; 3</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "122333",
        "expected": "1 -> 1\n2 -> 2\n3 -> 3",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "5005",
        "expected": "0 -> 2\n5 -> 2",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "987654321",
        "expected": "1 -> 1\n2 -> 1\n3 -> 1\n4 -> 1\n5 -> 1\n6 -> 1\n7 -> 1\n8 -> 1\n9 -> 1",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "11111",
        "expected": "1 -> 5",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2048",
        "expected": "0 -> 1\n2 -> 1\n4 -> 1\n8 -> 1",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "7",
        "expected": "7 -> 1",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "102030",
        "expected": "0 -> 3\n1 -> 1\n2 -> 1\n3 -> 1",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1122334455",
        "expected": "1 -> 2\n2 -> 2\n3 -> 2\n4 -> 2\n5 -> 2",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p47-automorphic-number",
    "title": "59. Automorphic Number Verification",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>In mathematical pattern recognition, an automorphic number is a number whose square ends with the same digits as the number itself (e.g. 25<sup>2</sup> = 625 which ends in 25). You are building a checker for such numbers.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>An integer <code>n</code>.</p>\n<br/>\n<p><strong>Output:</strong></p>\n<p>Print <code>Automorphic Number</code> or <code>Not Automorphic Number</code>.</p>\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>25</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Automorphic Number</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>13</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Not Automorphic Number</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "25",
        "expected": "Automorphic Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "13",
        "expected": "Not Automorphic Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "5",
        "expected": "Automorphic Number",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "6",
        "expected": "Automorphic Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "76",
        "expected": "Automorphic Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "10",
        "expected": "Not Automorphic Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "9",
        "expected": "Not Automorphic Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "376",
        "expected": "Automorphic Number",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p48-twisted-prime",
    "title": "60. Twisted Prime Detection in Number Systems",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>A number is considered a Twisted Prime if:</p>\n<ol>\n  <li>The number itself is prime</li>\n  <li>Its reverse is also prime</li>\n</ol>\n<p>Such numbers are used in advanced number theory studies. You are asked to check whether a given number is a Twisted Prime.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>An integer <code>n</code>.</p>\n<br/>\n<p><strong>Output:</strong></p>\n<p>Print <code>Twisted Prime</code> or <code>Not Twisted Prime</code>.</p>\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>13</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Twisted Prime</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>23</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Not Twisted Prime</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "13",
        "expected": "Twisted Prime",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "23",
        "expected": "Not Twisted Prime",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "17",
        "expected": "Twisted Prime",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "37",
        "expected": "Twisted Prime",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "79",
        "expected": "Twisted Prime",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "15",
        "expected": "Not Twisted Prime",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "Twisted Prime",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "7",
        "expected": "Twisted Prime",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l2-p49-advanced-mirror-pattern",
    "title": "61. Advanced Mirror Pattern for Display Systems",
    "difficulty": "Medium",
    "level": 2,
    "description": "<p>A digital display system is used in scoreboards and banners to show mirrored numeric patterns for aesthetic symmetry. You are required to generate a pattern where numbers increase on the left, spaces appear in the middle, and numbers decrease on the right.</p>\n<br/>\n<p><strong>Input:</strong></p>\n<p>An integer <code>n</code>.</p>\n<br/>\n<p><strong>Output:</strong></p>\n<p>Mirror pattern with <code>n</code> rows. Row <code>i</code> contains numbers <code>1..i</code>, followed by <code>2*(n - i)</code> spaces, followed by numbers <code>i..1</code>.</p>\n<br/>\n<p><strong>Sample Input:</strong></p>\n<pre>5</pre>\n<p><strong>Sample Output:</strong></p>\n<pre>1        1\n12      21\n123    321\n1234  4321\n1234554321</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5",
        "expected": "1        1\n12      21\n123    321\n1234  4321\n1234554321",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1",
        "expected": "11",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2",
        "expected": "1  1\n1221",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3",
        "expected": "1    1\n12  21\n123321",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4",
        "expected": "1      1\n12    21\n123  321\n12344321",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6",
        "expected": "1          1\n12        21\n123      321\n1234    4321\n12345  54321\n123456654321",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "7",
        "expected": "1            1\n12          21\n123        321\n1234      4321\n12345    54321\n123456  654321\n12345677654321",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "8",
        "expected": "1              1\n12            21\n123          321\n1234        4321\n12345      54321\n123456    654321\n1234567  7654321\n1234567887654321",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p1-even-odd-divisible",
    "title": "1. Even or Odd Divisible",
    "difficulty": "Easy",
    "level": 3,
    "description": "Given an array of size N, count how many elements are even and how many are odd. If even count == odd count, print 'Neither even nor odd divisble.'. If even count > odd count, print 'Even Divisible.'. If odd count > even count, print 'Odd Divisible.'\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n61 52 28 34 89</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Even Divisible.</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>4\n1 3 5 7</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Odd Divisible.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n61 52 28 34 89",
        "expected": "Even Divisible.",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4\n1 3 5 7",
        "expected": "Odd Divisible.",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2\n2 3",
        "expected": "Neither even nor odd divisble.",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1\n7",
        "expected": "Odd Divisible.",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6\n2 4 6 8 10 12",
        "expected": "Even Divisible.",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\n-2 -3 -4 -5 -6",
        "expected": "Even Divisible.",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3\n11 22 33",
        "expected": "Odd Divisible.",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p2-avg-array",
    "title": "2. Calculate Avg of an Array",
    "difficulty": "Easy",
    "level": 3,
    "description": "Calculate the average of an array. Output the result up to 2 decimal places.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n10 20 40 20 15</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>21.00</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n1 2 3</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>2.00</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n10 20 40 20 15",
        "expected": "21.00",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3\n1 2 3",
        "expected": "2.00",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4\n5 5 5 5",
        "expected": "5.00",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1\n7",
        "expected": "7.00",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4\n-10 20 -30 40",
        "expected": "5.00",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3\n1 1 2",
        "expected": "1.33",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2\n1 2",
        "expected": "1.50",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p3-right-rotation-char",
    "title": "3. Right Rotation (Characters)",
    "difficulty": "Medium",
    "level": 3,
    "description": "Right rotate an array of characters by k positions. Input format: size of array, followed by the characters, followed by k. Print each character on a new line.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\nA B C D E\n2</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>D\nE\nA\nB\nC</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\nx y z\n1</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>z\nx\ny</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\nA B C D E\n2",
        "expected": "D\nE\nA\nB\nC",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3\nx y z\n1",
        "expected": "z\nx\ny",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4\na b c d\n4",
        "expected": "a\nb\nc\nd",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1\nQ\n5",
        "expected": "Q",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\na b c d e\n7",
        "expected": "d\ne\na\nb\nc",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4\nW X Y Z\n0",
        "expected": "W\nX\nY\nZ",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6\np q r s t u\n3",
        "expected": "s\nt\nu\np\nq\nr",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p4-prime-occurrences",
    "title": "4. Count the Occurrences of Prime Number",
    "difficulty": "Medium",
    "level": 3,
    "description": "Count the frequencies of prime numbers in an array. Input: size of array, then the elements. Output format: '\\nFrequencies of Prime Numbers:\\n' followed by '[num] occurs [freq] time(s).\\n'.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>8\n2 3 44 5 5 7 8 3</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Frequencies of Prime Numbers:\n2 occurs 1 time(s).\n3 occurs 2 time(s).\n5 occurs 2 time(s).\n7 occurs 1 time(s).</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n4 6 8</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Frequencies of Prime Numbers:</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "8\n2 3 44 5 5 7 8 3",
        "expected": "Frequencies of Prime Numbers:\n2 occurs 1 time(s).\n3 occurs 2 time(s).\n5 occurs 2 time(s).\n7 occurs 1 time(s).",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3\n4 6 8",
        "expected": "Frequencies of Prime Numbers:",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2\n2 2",
        "expected": "Frequencies of Prime Numbers:\n2 occurs 2 time(s).",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\n7 7 7 7 7",
        "expected": "Frequencies of Prime Numbers:\n7 occurs 5 time(s).",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6\n11 4 11 13 4 2",
        "expected": "Frequencies of Prime Numbers:\n11 occurs 2 time(s).\n13 occurs 1 time(s).\n2 occurs 1 time(s).",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\n-7 0 1 2 3",
        "expected": "Frequencies of Prime Numbers:\n2 occurs 1 time(s).\n3 occurs 1 time(s).",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4\n97 89 2 2",
        "expected": "Frequencies of Prime Numbers:\n97 occurs 1 time(s).\n89 occurs 1 time(s).\n2 occurs 2 time(s).",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p5-max-so-far",
    "title": "5. Max So Far",
    "difficulty": "Hard",
    "level": 3,
    "description": "Implement a modified subarray sum algorithm. `max_end` starts at `arr[0]`, `max_so_far` starts at `0`. Iterate from `i=1` to `n-1`: `max_end = max_end + arr[i]`; `if (max_end > max_so_far) max_so_far = max_end`; `if (max_end < max_so_far) max_end = 0;`. Print `max_so_far`.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n-1 2 -3 -4 -5</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>2</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>4\n1 2 3 4</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>10</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n-1 2 -3 -4 -5",
        "expected": "2",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "4\n1 2 3 4",
        "expected": "10",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n-5 -2 -1",
        "expected": "0",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n2 4 6 8",
        "expected": "20",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n-3 -1 -2 -4 -5",
        "expected": "0",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "3\n5 -10 8",
        "expected": "8",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n-2 3 4 -1",
        "expected": "7",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p6-divisible-count",
    "title": "6. Elements Divisible by Target",
    "difficulty": "Easy",
    "level": 3,
    "description": "Take the size of an array, its elements, and a divisor. Count how many elements are divisible by that divisor and display the count.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n21 24 6 5 1\n3</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>3</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>4\n10 20 30 40\n10</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>4</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n21 24 6 5 1\n3",
        "expected": "3",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "4\n10 20 30 40\n10",
        "expected": "4",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n1 2 3\n5",
        "expected": "0",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n-6 -5 -4 -3 -2\n3",
        "expected": "2",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1\n100\n7",
        "expected": "0",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n7 14 21 28 35 42\n7",
        "expected": "6",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n0 5 10 15\n5",
        "expected": "4",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p7-less-than-target",
    "title": "7. Elements Less Than or Equal to Target",
    "difficulty": "Easy",
    "level": 3,
    "description": "Take the array size, elements, and a target value. Print all elements less than or equal to the target, separated by spaces.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n21 24 6 5 1\n6</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>6 5 1</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>4\n10 20 30 40\n25</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>10 20</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n21 24 6 5 1\n6",
        "expected": "6 5 1",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4\n10 20 30 40\n25",
        "expected": "10 20",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3\n1 2 3\n0",
        "expected": "",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\n-5 -1 0 3 8\n0",
        "expected": "-5 -1 0",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4\n10 20 30 40\n100",
        "expected": "10 20 30 40",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3\n5 5 5\n5",
        "expected": "5 5 5",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6\n9 7 5 3 1 2\n4",
        "expected": "3 1 2",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p8-left-rotation-int",
    "title": "8. Left Rotation (Integers)",
    "difficulty": "Medium",
    "level": 3,
    "description": "Left rotate an array of integers by k positions. Output each element on a new line.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>10\n1 2 3 4 5 6 7 8 9 10\n3</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>4\n5\n6\n7\n8\n9\n10\n1\n2\n3</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n1 2 3\n1</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>2\n3\n1</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "10\n1 2 3 4 5 6 7 8 9 10\n3",
        "expected": "4\n5\n6\n7\n8\n9\n10\n1\n2\n3",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n1 2 3\n1",
        "expected": "2\n3\n1",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "2\n5 10\n2",
        "expected": "5\n10",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1\n42\n10",
        "expected": "42",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n1 2 3 4 5\n7",
        "expected": "3\n4\n5\n1\n2",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n-1 -2 -3 -4\n0",
        "expected": "-1\n-2\n-3\n-4",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n10 20 30 40 50 60\n4",
        "expected": "50\n60\n10\n20\n30\n40",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p9-last-repeated",
    "title": "9. Find the Last Repeated Number",
    "difficulty": "Medium",
    "level": 3,
    "description": "Find and print the last repeated number in an array. A repeated number is one that appears again later in the array. If none found, print 'No repeated elements found'.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n1 2 3 2 1</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>2</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>4\n1 2 3 4</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>No repeated elements found</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n1 2 3 2 1",
        "expected": "2",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4\n1 2 3 4",
        "expected": "No repeated elements found",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "6\n5 5 6 6 7 7",
        "expected": "7",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "7\n4 1 4 2 1 3 2",
        "expected": "2",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\n9 8 7 6 5",
        "expected": "No repeated elements found",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4\n3 3 3 3",
        "expected": "3",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6\n-1 2 -1 3 2 4",
        "expected": "2",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p10-right-rotation-int",
    "title": "10. Right Rotation (Integers)",
    "difficulty": "Medium",
    "level": 3,
    "description": "Right rotate an array of integers by k positions. Output each element on a new line.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n10 20 30 40 50\n2</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>40\n50\n10\n20\n30</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>4\n1 2 3 4\n1</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>4\n1\n2\n3</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n10 20 30 40 50\n2",
        "expected": "40\n50\n10\n20\n30",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "4\n1 2 3 4\n1",
        "expected": "4\n1\n2\n3",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n10 20 30\n3",
        "expected": "10\n20\n30",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1\n99\n3",
        "expected": "99",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n5 4 3 2 1\n8",
        "expected": "3\n2\n1\n5\n4",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n-5 -10 -15 -20\n0",
        "expected": "-5\n-10\n-15\n-20",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n1 3 5 7 9 11\n2",
        "expected": "9\n11\n1\n3\n5\n7",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p11-left-rotation-char",
    "title": "11. Left Rotation (Characters)",
    "difficulty": "Medium",
    "level": 3,
    "description": "Left rotate an array of characters by k positions. Output each element on a new line.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>6\nA B C D E f\n2</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>C\nD\nE\nf\nA\nB</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\nx y z\n1</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>y\nz\nx</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "6\nA B C D E f\n2",
        "expected": "C\nD\nE\nf\nA\nB",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3\nx y z\n1",
        "expected": "y\nz\nx",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4\na b c d\n4",
        "expected": "a\nb\nc\nd",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1\nZ\n9",
        "expected": "Z",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\np q r s t\n12",
        "expected": "r\ns\nt\np\nq",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4\nA a B b\n0",
        "expected": "A\na\nB\nb",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6\nm n o p q r\n5",
        "expected": "r\nm\nn\no\np\nq",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p12-print-even-nums",
    "title": "12. Remove Odd Print Even Num",
    "difficulty": "Easy",
    "level": 3,
    "description": "From an array, print only the even numbers. Each on a new line.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>7\n6 3 8 1 6 9 2</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>6\n8\n6\n2</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n1 3 5</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre></pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "7\n6 3 8 1 6 9 2",
        "expected": "6\n8\n6\n2",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n1 3 5",
        "expected": "",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "4\n2 4 6 8",
        "expected": "2\n4\n6\n8",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n-4 -3 -2 -1 0 1",
        "expected": "-4\n-2\n0",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1\n7",
        "expected": "",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n11 22 33 44 55",
        "expected": "22\n44",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "8\n2 2 3 3 4 4 5 5",
        "expected": "2\n2\n4\n4",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p13-sum-non-repeated",
    "title": "13. Sum of Non-Repeated Elements",
    "difficulty": "Medium",
    "level": 3,
    "description": "Find the sum of all elements in the array that appear exactly once. Input: size, then elements. Output: 'Sum of non-repeated elements: %d\\n'.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>7\n2 3 2 4 5 4 6</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Sum of non-repeated elements: 14</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>4\n1 1 2 2</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Sum of non-repeated elements: 0</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "7\n2 3 2 4 5 4 6",
        "expected": "Sum of non-repeated elements: 14",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4\n1 1 2 2",
        "expected": "Sum of non-repeated elements: 0",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3\n1 2 3",
        "expected": "Sum of non-repeated elements: 6",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\n5 5 5 5 5",
        "expected": "Sum of non-repeated elements: 0",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6\n-1 -1 2 3 -2 2",
        "expected": "Sum of non-repeated elements: 1",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1\n42",
        "expected": "Sum of non-repeated elements: 42",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "8\n7 3 7 8 3 9 8 10",
        "expected": "Sum of non-repeated elements: 19",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p14-square-duplicate",
    "title": "14. Square of Duplicate Elements",
    "difficulty": "Medium",
    "level": 3,
    "description": "If an element appears more than once in the array, square it. Otherwise, keep it as it is. Output: 'Result:\\n' followed by the modified array elements.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>6\n2 5 2 6 5 3</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Result:\n4 25 4 6 25 3</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n1 2 3</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Result:\n1 2 3</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "6\n2 5 2 6 5 3",
        "expected": "Result:\n4 25 4 6 25 3",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n1 2 3",
        "expected": "Result:\n1 2 3",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "4\n2 2 2 2",
        "expected": "Result:\n4 4 4 4",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n3 1 3 4 1",
        "expected": "Result:\n9 1 9 4 1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n-2 -2 5 6",
        "expected": "Result:\n4 4 5 6",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1\n7",
        "expected": "Result:\n7",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n9 8 7 6 5 4",
        "expected": "Result:\n9 8 7 6 5 4",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p15-second-largest",
    "title": "15. Second Largest Num",
    "difficulty": "Easy",
    "level": 3,
    "description": "Find the second largest number in the array. Output: 'Second largest number is: %d\\n'.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>4\n76 76 22 56</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Second largest number is: 56</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>5\n1 2 3 4 5</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Second largest number is: 4</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "4\n76 76 22 56",
        "expected": "Second largest number is: 56",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "5\n1 2 3 4 5",
        "expected": "Second largest number is: 4",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3\n10 10 10",
        "expected": "Second largest number is: 10",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6\n5 1 5 9 9 3",
        "expected": "Second largest number is: 5",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4\n-5 -1 -10 -3",
        "expected": "Second largest number is: -3",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2\n100 1",
        "expected": "Second largest number is: 1",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\n7 7 7 2 2",
        "expected": "Second largest number is: 2",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p16-array-sum-calc",
    "title": "16. Array Sum Calculation",
    "difficulty": "Easy",
    "level": 3,
    "description": "Calculate sum of 1st and last, and 2nd and 2nd last elements. If size < 2, print 'Array should have at least 2 elements.'. Output format: 'Sum of first and last element: %d', 'Sum of second and second last element: %d', 'Total of both sums: %d'.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n1 2 3 4 5</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Sum of first and last element: 6\nSum of second and second last element: 6\nTotal of both sums: 12</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>1\n10</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Array should have at least 2 elements.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n1 2 3 4 5",
        "expected": "Sum of first and last element: 6\nSum of second and second last element: 6\nTotal of both sums: 12",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "1\n10",
        "expected": "Array should have at least 2 elements.",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4\n1 2 3 4",
        "expected": "Sum of first and last element: 5\nSum of second and second last element: 5\nTotal of both sums: 10",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "2\n7 3",
        "expected": "Sum of first and last element: 10\nSum of second and second last element: 10\nTotal of both sums: 20",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n-1 2 -3 4 -5 6",
        "expected": "Sum of first and last element: 5\nSum of second and second last element: -3\nTotal of both sums: 2",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "3\n10 20 30",
        "expected": "Sum of first and last element: 40\nSum of second and second last element: 40\nTotal of both sums: 80",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1\n-7",
        "expected": "Array should have at least 2 elements.",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p17-reverse-array",
    "title": "17. Reverse an Array",
    "difficulty": "Easy",
    "level": 3,
    "description": "Reverse the array. Output: 'Reversed array:\\n' followed by elements.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>7\n2 9 4 5 8 7 6</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Reversed array:\n6 7 8 5 4 9 2</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n1 2 3</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Reversed array:\n3 2 1</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "7\n2 9 4 5 8 7 6",
        "expected": "Reversed array:\n6 7 8 5 4 9 2",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n1 2 3",
        "expected": "Reversed array:\n3 2 1",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "1\n5",
        "expected": "Reversed array:\n5",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n9 8 7 6 5",
        "expected": "Reversed array:\n5 6 7 8 9",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n1 1 2 2",
        "expected": "Reversed array:\n2 2 1 1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "2\n-3 4",
        "expected": "Reversed array:\n4 -3",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n1 2 3 4 5 6",
        "expected": "Reversed array:\n6 5 4 3 2 1",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p18-remove-prime",
    "title": "18. Remove Prime Num Print Non Prime",
    "difficulty": "Medium",
    "level": 3,
    "description": "Print only the non-prime elements of the array. Output: 'Non-prime elements:\\n' followed by elements.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>7\n2 9 4 5 8 7 6</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Non-prime elements:\n9 4 8 6</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n2 3 5</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Non-prime elements:\n</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "7\n2 9 4 5 8 7 6",
        "expected": "Non-prime elements:\n9 4 8 6",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n2 3 5",
        "expected": "Non-prime elements:\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4\n4 6 8 9",
        "expected": "Non-prime elements:\n4 6 8 9",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n11 13 17 19 23",
        "expected": "Non-prime elements:",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n1 0 15 21 4 7",
        "expected": "Non-prime elements:\n1 0 15 21 4",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n-3 -4 2 8 9",
        "expected": "Non-prime elements:\n-3 -4 8 9",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n25 49 121 2",
        "expected": "Non-prime elements:\n25 49 121",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p19-add-peak-num",
    "title": "19. Add Peak Num and Its Neighbour",
    "difficulty": "Hard",
    "level": 3,
    "description": "Find peak elements (strictly greater than neighbours). Replace a peak element with the sum of itself and its neighbours. Handle edges: if first element is > second, sum them. Output the modified array.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>7\n1 2 3 4 5 3 1</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>1 2 3 4 12 3 1</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>4\n2 1 3 2</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>3 1 6 2</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "7\n1 2 3 4 5 3 1",
        "expected": "1 2 3 4 12 3 1",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "4\n2 1 3 2",
        "expected": "3 1 6 2",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n1 2 3",
        "expected": "1 2 5",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n5 1 4 2 3",
        "expected": "6 1 7 2 5",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n3 1 2 5 4 6",
        "expected": "4 1 2 11 4 10",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n4 3 2 1",
        "expected": "7 3 2 1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "2\n9 4",
        "expected": "13 4",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p20-closest-to-0",
    "title": "20. Find Indices of Element Closest to 0",
    "difficulty": "Hard",
    "level": 3,
    "description": "Find the indices of the two elements whose sum is closest to 0. Output: '%d and %d\\n', idx1, idx2.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n-1 -2 -3 0 1</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>0 and 4</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>4\n1 2 3 4</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>0 and 1</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n-1 -2 -3 0 1",
        "expected": "0 and 4",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4\n1 2 3 4",
        "expected": "0 and 1",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3\n-5 5 10",
        "expected": "0 and 1",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4\n-10 3 7 -3",
        "expected": "1 and 3",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\n5 5 5 5 5",
        "expected": "0 and 1",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3\n-8 2 5",
        "expected": "0 and 2",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6\n10 -4 -6 1 2 -1",
        "expected": "3 and 5",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p21-remove-negative",
    "title": "21. Remove Negative Num",
    "difficulty": "Easy",
    "level": 3,
    "description": "Print all negative numbers. Output: 'Negative numbers: ' followed by numbers. If no negative numbers exist, print 'Invalid'.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n1 -2 3 -4 5</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Negative numbers: -2 -4</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n1 2 3</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Invalid</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n1 -2 3 -4 5",
        "expected": "Negative numbers: -2 -4",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3\n1 2 3",
        "expected": "Invalid",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2\n-1 -2",
        "expected": "Negative numbers: -1 -2",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6\n-5 10 -15 20 -25 30",
        "expected": "Negative numbers: -5 -15 -25",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1\n-99",
        "expected": "Negative numbers: -99",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\n3 -1 0 -2 8",
        "expected": "Negative numbers: -1 -2",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4\n0 7 3 9",
        "expected": "Invalid",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p22-merge-descending",
    "title": "22. Merging 2 Arrays in Descending Order",
    "difficulty": "Medium",
    "level": 3,
    "description": "Merge two arrays and sort the combined array in descending order. Input: size1, array1, size2, array2. Output: 'Merged array in descending order:\\n' followed by elements.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n1 2 3 4 5\n5\n44 5 7 8 90</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Merged array in descending order:\n90 44 8 7 5 5 4 3 2 1</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>2\n10 20\n2\n5 15</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Merged array in descending order:\n20 15 10 5</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n1 2 3 4 5\n5\n44 5 7 8 90",
        "expected": "Merged array in descending order:\n90 44 8 7 5 5 4 3 2 1",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "2\n10 20\n2\n5 15",
        "expected": "Merged array in descending order:\n20 15 10 5",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "1\n1\n1\n2",
        "expected": "Merged array in descending order:\n2 1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "3\n-1 -5 3\n2\n0 -2",
        "expected": "Merged array in descending order:\n3 0 -1 -2 -5",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n5 5 5 5\n3\n5 5 5",
        "expected": "Merged array in descending order:\n5 5 5 5 5 5 5",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "2\n100 1\n3\n50 25 75",
        "expected": "Merged array in descending order:\n100 75 50 25 1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1\n-10\n1\n-20",
        "expected": "Merged array in descending order:\n-10 -20",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p23-leader-element",
    "title": "23. Find the Leader Element",
    "difficulty": "Medium",
    "level": 3,
    "description": "An element is a leader if there is no element to its right that is greater than or equal to it. Output: 'Leaders in the array are: ' followed by the leader elements from right to left.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n44 55 22 32 1</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Leaders in the array are: 1 32 55</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>6\n16 17 4 3 5 2</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Leaders in the array are: 2 5 17</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n44 55 22 32 1",
        "expected": "Leaders in the array are: 1 32 55",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "6\n16 17 4 3 5 2",
        "expected": "Leaders in the array are: 2 5 17",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n1 2 3",
        "expected": "Leaders in the array are: 3",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n5 5 5 5 5",
        "expected": "Leaders in the array are: 5",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n9 7 5 3 1 -1",
        "expected": "Leaders in the array are: -1 1 3 5 7 9",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n1 3 2 4",
        "expected": "Leaders in the array are: 4",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "7\n10 20 10 30 20 40 5",
        "expected": "Leaders in the array are: 5 40",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p24-second-smallest",
    "title": "24. Print Second Smallest",
    "difficulty": "Medium",
    "level": 3,
    "description": "Find the second smallest element in the array.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>6\n4 11 7 6 3 6</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>4</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>4\n10 5 8 2</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>5</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "6\n4 11 7 6 3 6",
        "expected": "4",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "4\n10 5 8 2",
        "expected": "5",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n1 1 2",
        "expected": "2",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n9 9 9 1 1",
        "expected": "9",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n-3 -7 -1 -5",
        "expected": "-5",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "2\n8 3",
        "expected": "8",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n5 2 8 2 9 5",
        "expected": "5",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p25-peak-element",
    "title": "25. Peak Element Identification",
    "difficulty": "Medium",
    "level": 3,
    "description": "Identify all peak elements in the array. An element is a peak if it is greater than or equal to its neighbors. Output: 'Peak elements are: ' followed by the peak elements.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>6\n0 20 15 2 23 90</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Peak elements are: 20 90</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n10 20 15</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Peak elements are: 20</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "6\n0 20 15 2 23 90",
        "expected": "Peak elements are: 20 90",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3\n10 20 15",
        "expected": "Peak elements are: 20",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4\n1 2 3 4",
        "expected": "Peak elements are: 4",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\n5 5 5 5 5",
        "expected": "Peak elements are: 5 5 5 5 5",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "7\n-5 -2 -8 -1 -9 -3 -4",
        "expected": "Peak elements are: -2 -1 -3",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2\n9 3",
        "expected": "Peak elements are: 9",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "8\n1 3 2 4 3 5 4 6",
        "expected": "Peak elements are: 3 4 5 6",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p26-swap-ends",
    "title": "26. Reverse Array via Swapping",
    "difficulty": "Easy",
    "level": 3,
    "description": "Swap the 1st element with the last, 2nd with 2nd last, etc. Essentially reverse the array. Output: 'Reversed array: ' followed by the elements.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n11 22 77 88 55</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Reversed array: 55 88 77 22 11</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n1 2 3</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Reversed array: 3 2 1</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n11 22 77 88 55",
        "expected": "Reversed array: 55 88 77 22 11",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n1 2 3",
        "expected": "Reversed array: 3 2 1",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "2\n10 20",
        "expected": "Reversed array: 20 10",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1\n42",
        "expected": "Reversed array: 42",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n-1 -2 -3 -4 -5 -6",
        "expected": "Reversed array: -6 -5 -4 -3 -2 -1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n7 7 7 7",
        "expected": "Reversed array: 7 7 7 7",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "7\n100 200 300 400 500 600 700",
        "expected": "Reversed array: 700 600 500 400 300 200 100",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p27-remove-positive",
    "title": "27. Remove Positive Num",
    "difficulty": "Easy",
    "level": 3,
    "description": "Print only the negative numbers in the array. Output: 'Negative numbers in the array are:\\n' followed by the numbers.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>6\n-3 4 0 -7 -1 9</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Negative numbers in the array are:\n-3 -7 -1</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n1 2 3</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Negative numbers in the array are:\n</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "6\n-3 4 0 -7 -1 9",
        "expected": "Negative numbers in the array are:\n-3 -7 -1",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n1 2 3",
        "expected": "Negative numbers in the array are:\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2\n-10 -20",
        "expected": "Negative numbers in the array are:\n-10 -20",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n0 0 0 0 0",
        "expected": "Negative numbers in the array are:",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "7\n-5 10 -15 20 -25 30 -35",
        "expected": "Negative numbers in the array are:\n-5 -15 -25 -35",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1\n-99",
        "expected": "Negative numbers in the array are:\n-99",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n-8 -3 -12 -1",
        "expected": "Negative numbers in the array are:\n-8 -3 -12 -1",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p28-pair-sum",
    "title": "28. First Pair Target Sum",
    "difficulty": "Medium",
    "level": 3,
    "description": "Find the first pair of numbers in the array whose sum equals the target. Input: size, array, target. Output: 'First pair that sums to %d is: [%d, %d]\\n' (where %d are target, index1, index2). If none found, print 'No pair found that sums to %d\\n'.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>6\n2 7 11 15 -2 4\n9</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>First pair that sums to 9 is: [0, 1]</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>4\n1 3 5 7\n20</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>No pair found that sums to 20</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "6\n2 7 11 15 -2 4\n9",
        "expected": "First pair that sums to 9 is: [0, 1]",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4\n1 3 5 7\n20",
        "expected": "No pair found that sums to 20",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3\n1 2 3\n5",
        "expected": "First pair that sums to 5 is: [1, 2]",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\n-4 10 3 -7 8\n1",
        "expected": "First pair that sums to 1 is: [3, 4]",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4\n5 5 5 5\n10",
        "expected": "First pair that sums to 10 is: [0, 1]",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3\n-10 0 10\n0",
        "expected": "First pair that sums to 0 is: [0, 2]",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\n1 2 3 4 5\n100",
        "expected": "No pair found that sums to 100",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p29-unique-elements",
    "title": "29. Unique Elements",
    "difficulty": "Medium",
    "level": 3,
    "description": "Print elements that appear exactly once in the array. Output: 'Unique elements in the array are:\\n' followed by the elements.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>6\n1 2 3 2 1 4</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Unique elements in the array are:\n3 4</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n1 1 1</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Unique elements in the array are:\n</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "6\n1 2 3 2 1 4",
        "expected": "Unique elements in the array are:\n3 4",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n1 1 1",
        "expected": "Unique elements in the array are:\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4\n5 6 7 8",
        "expected": "Unique elements in the array are:\n5 6 7 8",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "8\n4 4 4 4 4 4 4 9",
        "expected": "Unique elements in the array are:\n9",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n-1 -2 -1 -2 -3",
        "expected": "Unique elements in the array are:\n-3",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n10 20 10 30 20 40",
        "expected": "Unique elements in the array are:\n30 40",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1\n7",
        "expected": "Unique elements in the array are:\n7",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p30-majority-element",
    "title": "30. Print Majority Element",
    "difficulty": "Medium",
    "level": 3,
    "description": "Find the element that appears more than n/2 times. Output: 'Majority element is %d\\n' or 'No majority element found\\n'.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>7\n3 3 4 2 3 3 3</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Majority element is 3</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>6\n1 2 3 2 3 1</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>No majority element found</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "7\n3 3 4 2 3 3 3",
        "expected": "Majority element is 3",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "6\n1 2 3 2 3 1",
        "expected": "No majority element found",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3\n1 1 2",
        "expected": "Majority element is 1",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\n2 2 2 2 9",
        "expected": "Majority element is 2",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4\n-3 -3 1 -3",
        "expected": "Majority element is -3",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\n1 2 1 2 3",
        "expected": "No majority element found",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1\n42",
        "expected": "Majority element is 42",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p31-odd-count",
    "title": "31. Print Odd Count",
    "difficulty": "Easy",
    "level": 3,
    "description": "Count the number of odd elements in the array. Output: 'Count of odd numbers = %d\\n'.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n1 4 7 8 3</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Count of odd numbers = 3</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n2 4 6</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Count of odd numbers = 0</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n1 4 7 8 3",
        "expected": "Count of odd numbers = 3",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3\n2 4 6",
        "expected": "Count of odd numbers = 0",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2\n1 3",
        "expected": "Count of odd numbers = 2",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6\n-1 -2 -3 -4 -5 -6",
        "expected": "Count of odd numbers = 3",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4\n0 0 0 0",
        "expected": "Count of odd numbers = 0",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1\n13",
        "expected": "Count of odd numbers = 1",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "8\n11 22 33 44 55 66 77 88",
        "expected": "Count of odd numbers = 4",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p32-first-even",
    "title": "32. Print 1st Even Number",
    "difficulty": "Easy",
    "level": 3,
    "description": "Print the first even number found in the array. Output: 'First even number is: %d\\n' or 'No even number found in the array\\n'.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>6\n1 3 5 8 7 2</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>First even number is: 8</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n1 3 5</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>No even number found in the array</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "6\n1 3 5 8 7 2",
        "expected": "First even number is: 8",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3\n1 3 5",
        "expected": "No even number found in the array",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2\n2 4",
        "expected": "First even number is: 2",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\n7 9 11 13 14",
        "expected": "First even number is: 14",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4\n-3 -5 -8 -7",
        "expected": "First even number is: -8",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3\n9 7 5",
        "expected": "No even number found in the array",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1\n100",
        "expected": "First even number is: 100",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p33-split-sort",
    "title": "33. Split and Print Odd & Even in Ascending Order",
    "difficulty": "Hard",
    "level": 3,
    "description": "Split the array into even and odd arrays, sort them in ascending order, and print. Output: 'Even elements in ascending order:\\n' [elements] '\\nOdd elements in ascending order:\\n' [elements].\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>10\n5 2 8 1 9 4 6 7 3 10</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Even elements in ascending order:\n2 4 6 8 10\nOdd elements in ascending order:\n1 3 5 7 9</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n1 3 5</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Even elements in ascending order:\n\nOdd elements in ascending order:\n1 3 5</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "10\n5 2 8 1 9 4 6 7 3 10",
        "expected": "Even elements in ascending order:\n2 4 6 8 10\nOdd elements in ascending order:\n1 3 5 7 9",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n1 3 5",
        "expected": "Even elements in ascending order:\n\nOdd elements in ascending order:\n1 3 5",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "4\n4 2 8 6",
        "expected": "Even elements in ascending order:\n2 4 6 8\nOdd elements in ascending order:",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n9 7 5 3 1 0",
        "expected": "Even elements in ascending order:\n0\nOdd elements in ascending order:\n1 3 5 7 9",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n-4 -3 -2 -1 0",
        "expected": "Even elements in ascending order:\n-4 -2 0\nOdd elements in ascending order:\n-3 -1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n8 6 4 2",
        "expected": "Even elements in ascending order:\n2 4 6 8\nOdd elements in ascending order:",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "7\n3 1 4 1 5 9 2",
        "expected": "Even elements in ascending order:\n2 4\nOdd elements in ascending order:\n1 1 3 5 9",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p34-cyclic-right",
    "title": "34. Cyclic Rotation Right",
    "difficulty": "Medium",
    "level": 3,
    "description": "Cyclically rotate the array to the right by one position. Output: 'Right Cyclic Rotated Array:\\n' followed by elements.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n10 20 30 40 50</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Right Cyclic Rotated Array:\n50 10 20 30 40</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n1 2 3</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Right Cyclic Rotated Array:\n3 1 2</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n10 20 30 40 50",
        "expected": "Right Cyclic Rotated Array:\n50 10 20 30 40",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n1 2 3",
        "expected": "Right Cyclic Rotated Array:\n3 1 2",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "2\n10 20",
        "expected": "Right Cyclic Rotated Array:\n20 10",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1\n99",
        "expected": "Right Cyclic Rotated Array:\n99",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n-1 2 -3 4 -5 6",
        "expected": "Right Cyclic Rotated Array:\n6 -1 2 -3 4 -5",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n-7 -7 -7 -7",
        "expected": "Right Cyclic Rotated Array:\n-7 -7 -7 -7",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "7\n1 3 5 7 9 11 13",
        "expected": "Right Cyclic Rotated Array:\n13 1 3 5 7 9 11",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p35-cyclic-left",
    "title": "35. Cyclic Rotation Left",
    "difficulty": "Medium",
    "level": 3,
    "description": "Cyclically rotate the array to the left by one position. Output: 'Left Cyclic Rotated Array:\\n' followed by elements.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n10 20 30 40 50</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Left Cyclic Rotated Array:\n20 30 40 50 10</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n1 2 3</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Left Cyclic Rotated Array:\n2 3 1</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n10 20 30 40 50",
        "expected": "Left Cyclic Rotated Array:\n20 30 40 50 10",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n1 2 3",
        "expected": "Left Cyclic Rotated Array:\n2 3 1",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "2\n10 20",
        "expected": "Left Cyclic Rotated Array:\n20 10",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1\n77",
        "expected": "Left Cyclic Rotated Array:\n77",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n-10 20 -30 40 -50 60",
        "expected": "Left Cyclic Rotated Array:\n20 -30 40 -50 60 -10",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n9 9 8 8",
        "expected": "Left Cyclic Rotated Array:\n9 8 8 9",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "7\n2 4 6 8 10 12 14",
        "expected": "Left Cyclic Rotated Array:\n4 6 8 10 12 14 2",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p36-odd-indices",
    "title": "36. Elements at Odd Indices",
    "difficulty": "Easy",
    "level": 3,
    "description": "Print elements present at odd indices (1, 3, 5...). Output: 'Elements at odd indices:\\n' followed by elements.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>6\n10 20 30 40 50 60</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Elements at odd indices:\n20 40 60</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n1 2 3</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Elements at odd indices:\n2</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "6\n10 20 30 40 50 60",
        "expected": "Elements at odd indices:\n20 40 60",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n1 2 3",
        "expected": "Elements at odd indices:\n2",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "4\n5 10 15 20",
        "expected": "Elements at odd indices:\n10 20",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1\n55",
        "expected": "Elements at odd indices:",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n-5 -10 -15 -20 -25",
        "expected": "Elements at odd indices:\n-10 -20",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "8\n1 1 2 3 5 8 13 21",
        "expected": "Elements at odd indices:\n1 3 8 21",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "2\n100 200",
        "expected": "Elements at odd indices:\n200",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p37-remove-middle",
    "title": "37. Remove Middle Elements",
    "difficulty": "Medium",
    "level": 3,
    "description": "Remove the middle element(s) of an array. If size is even, remove `n/2 - 1` and `n/2`. If odd, remove `n/2`. Output: 'Array after removing center element(s):\\n' followed by the array.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>6\n1 2 3 4 5 6</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Array after removing center element(s):\n1 2 5 6</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>5\n10 20 30 40 50</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Array after removing center element(s):\n10 20 40 50</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "6\n1 2 3 4 5 6",
        "expected": "Array after removing center element(s):\n1 2 5 6",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "5\n10 20 30 40 50",
        "expected": "Array after removing center element(s):\n10 20 40 50",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "4\n1 2 3 4",
        "expected": "Array after removing center element(s):\n1 4",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "7\n5 4 3 2 1 0 -1",
        "expected": "Array after removing center element(s):\n5 4 3 1 0 -1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "8\n-5 -4 -3 -2 -1 0 1 2",
        "expected": "Array after removing center element(s):\n-5 -4 -3 0 1 2",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n7 7 7 7 7",
        "expected": "Array after removing center element(s):\n7 7 7 7",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "10\n1 1 2 3 5 8 13 21 34 55",
        "expected": "Array after removing center element(s):\n1 1 2 3 13 21 34 55",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p38-sort-halves",
    "title": "38. Sort Halves Differently",
    "difficulty": "Hard",
    "level": 3,
    "description": "Split the array into two halves (if size is odd, first half gets `(n+1)/2` elements). Sort the 1st half in ascending order, and the 2nd half in descending order. Output: 'Modified array:\\n' followed by elements on newlines.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n71 52 65 32 85</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Modified array:\n52\n65\n71\n85\n32</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>4\n71 62 31 49</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Modified array:\n62\n71\n49\n31</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n71 52 65 32 85",
        "expected": "Modified array:\n52\n65\n71\n85\n32",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "4\n71 62 31 49",
        "expected": "Modified array:\n62\n71\n49\n31",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n3 1 2",
        "expected": "Modified array:\n1\n3\n2",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n9 8 7 6 5 4",
        "expected": "Modified array:\n7\n8\n9\n6\n5\n4",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "7\n-3 10 -1 5 0 2 -8",
        "expected": "Modified array:\n-3\n-1\n5\n10\n2\n0\n-8",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n5 5 5 5",
        "expected": "Modified array:\n5\n5\n5\n5",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "2\n100 -100",
        "expected": "Modified array:\n100\n-100",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p39-freq-no-repeats",
    "title": "39. Frequency of Unique Elements",
    "difficulty": "Medium",
    "level": 3,
    "description": "Print the frequency of elements as they appear, without repeating them. Output: '\\nFrequencies of elements (no repeats):\\n' then '[num] occurs [freq] time(s).\\n'.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n2 2 66 4 4</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Frequencies of elements (no repeats):\n2 occurs 2 time(s).\n66 occurs 1 time(s).\n4 occurs 2 time(s).</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n1 2 1</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Frequencies of elements (no repeats):\n1 occurs 2 time(s).\n2 occurs 1 time(s).</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n2 2 66 4 4",
        "expected": "Frequencies of elements (no repeats):\n2 occurs 2 time(s).\n66 occurs 1 time(s).\n4 occurs 2 time(s).",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3\n1 2 1",
        "expected": "Frequencies of elements (no repeats):\n1 occurs 2 time(s).\n2 occurs 1 time(s).",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4\n5 5 5 5",
        "expected": "Frequencies of elements (no repeats):\n5 occurs 4 time(s).",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6\n-1 2 -1 3 2 -1",
        "expected": "Frequencies of elements (no repeats):\n-1 occurs 3 time(s).\n2 occurs 2 time(s).\n3 occurs 1 time(s).",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1\n42",
        "expected": "Frequencies of elements (no repeats):\n42 occurs 1 time(s).",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "7\n5 4 3 2 1 0 -1",
        "expected": "Frequencies of elements (no repeats):\n5 occurs 1 time(s).\n4 occurs 1 time(s).\n3 occurs 1 time(s).\n2 occurs 1 time(s).\n1 occurs 1 time(s).\n0 occurs 1 time(s).\n-1 occurs 1 time(s).",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "8\n9 9 8 8 7 7 6 6",
        "expected": "Frequencies of elements (no repeats):\n9 occurs 2 time(s).\n8 occurs 2 time(s).\n7 occurs 2 time(s).\n6 occurs 2 time(s).",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p40-even-odd-arrays",
    "title": "40. Arrays Multiply Even Add Odd",
    "difficulty": "Medium",
    "level": 3,
    "description": "Given two arrays, calculate the product of even numbers and the sum of odd numbers in each. Output the results in this exact order on newlines: evenProd1, oddSum1, evenProd2, oddSum2.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>4\n1 2 5 6\n5\n7 9 8 4 0</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>12\n6\n0\n16</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>2\n1 2\n2\n3 4</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>2\n1\n4\n3</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "4\n1 2 5 6\n5\n7 9 8 4 0",
        "expected": "12\n6\n0\n16",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "2\n1 2\n2\n3 4",
        "expected": "2\n1\n4\n3",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n2 2 2\n3\n1 1 1",
        "expected": "8\n0\n1\n3",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n-2 -3 -4 -5\n4\n0 1 2 3",
        "expected": "8\n-8\n0\n4",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1\n7\n1\n8",
        "expected": "1\n7\n8\n0",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n2 4 6 8 10\n5\n1 3 5 7 9",
        "expected": "3840\n0\n1\n25",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "3\n0 0 0\n2\n-1 -2",
        "expected": "0\n0\n-2\n-1",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p41-array-ranking",
    "title": "41. Array Ranking",
    "difficulty": "Medium",
    "level": 3,
    "description": "Replace each element by its rank (number of elements strictly smaller than it, plus 1). Output each rank on a new line.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n22 33 33 2 1</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>3\n4\n4\n2\n1</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>4\n10 10 10 10</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>1\n1\n1\n1</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n22 33 33 2 1",
        "expected": "3\n4\n4\n2\n1",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "4\n10 10 10 10",
        "expected": "1\n1\n1\n1",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n3 1 2",
        "expected": "3\n1\n2",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n-5 0 5 -5 10 0",
        "expected": "1\n3\n5\n1\n6\n3",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1\n99",
        "expected": "1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n5 4 3 2 1",
        "expected": "5\n4\n3\n2\n1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n-1 -1 2 2",
        "expected": "1\n1\n3\n3",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p42-adding-digits",
    "title": "42. Adding Integers From Array",
    "difficulty": "Medium",
    "level": 3,
    "description": "Treat an array as a sequence of digits representing a number. Add a given integer to it and print the result as an array `[d1, d2, d3]`. Input: size, array digits, number to add.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n9 9 9 9 9\n1</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>[0, 0, 0, 0, 0]</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>3\n1 2 3\n456</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>[5, 7, 9]</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n9 9 9 9 9\n1",
        "expected": "[0, 0, 0, 0, 0]",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3\n1 2 3\n456",
        "expected": "[5, 7, 9]",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4\n1 0 0 0\n234",
        "expected": "[1, 2, 3, 4]",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4\n2 5 0 0\n750",
        "expected": "[3, 2, 5, 0]",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3\n9 9 9\n1",
        "expected": "[0, 0, 0]",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6\n1 0 0 0 0 0\n999999",
        "expected": "[0, 9, 9, 9, 9, 9]",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2\n0 5\n5",
        "expected": "[1, 0]",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p43-remove-duplicates",
    "title": "43. Remove Duplicate Elements",
    "difficulty": "Easy",
    "level": 3,
    "description": "Print only the first occurrence of each element. Output: 'After removing duplicates: ' followed by the elements.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n1 2 2 3 5</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>After removing duplicates: 1 2 3 5</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>4\n1 1 1 1</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>After removing duplicates: 1</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n1 2 2 3 5",
        "expected": "After removing duplicates: 1 2 3 5",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "4\n1 1 1 1",
        "expected": "After removing duplicates: 1",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n3 2 1",
        "expected": "After removing duplicates: 3 2 1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "7\n-1 2 -1 3 2 4 -1",
        "expected": "After removing duplicates: -1 2 3 4",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n5 5 5 5 5 5",
        "expected": "After removing duplicates: 5",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1\n0",
        "expected": "After removing duplicates: 0",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "8\n3 1 4 1 5 9 2 6",
        "expected": "After removing duplicates: 3 1 4 5 9 2 6",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p44-array-shuffling",
    "title": "44. Array Shuffling",
    "difficulty": "Hard",
    "level": 3,
    "description": "Shuffle the array based on the given logic: print elements from the second half, then the middle element (if odd), then the first half.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>5\n1 2 3 4 5</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>4\n5\n3\n1\n2</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>4\n1 2 3 4</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>3\n4\n1\n2</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    int n, i;\n    scanf(\"%d\", &n);\n    int arr[n];\n    for(i=0; i<n; i++) scanf(\"%d\", &arr[i]);\n    for(i=n/2 + (n%2); i<n; i++) printf(\"%d\\n\", arr[i]);\n    if (n%2 != 0) printf(\"%d\\n\", arr[n/2]);\n    for(i=0; i<n/2; i++) printf(\"%d\\n\", arr[i]);\n    return 0;\n}",
    "testCases": [
      {
        "input": "5\n1 2 3 4 5",
        "expected": "4\n5\n3\n1\n2",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "4\n1 2 3 4",
        "expected": "3\n4\n1\n2",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n10 20 30",
        "expected": "30\n20\n10",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "7\n1 2 3 4 5 6 7",
        "expected": "5\n6\n7\n4\n1\n2\n3",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "6\n-1 -2 -3 -4 -5 -6",
        "expected": "-4\n-5\n-6\n-1\n-2\n-3",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "2\n100 200",
        "expected": "200\n100",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "8\n8 8 8 1 1 1 8 8",
        "expected": "1\n1\n8\n8\n8\n8\n8\n1",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p45-merge-sort-both",
    "title": "45. Merge 2 Arrays Sort Ascend and Descend",
    "difficulty": "Hard",
    "level": 3,
    "description": "Merge two arrays and print them sorted in ascending order, then descending order. Input: size1, array1, size2, array2. Output: 'Merged array in ascending order:\\n' [elements] '\\nMerged array in descending order:\\n' [elements].\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>4\n3 5 1 2\n5\n3 4 0 9 33</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Merged array in ascending order:\n0 1 2 3 3 4 5 9 33\nMerged array in descending order:\n33 9 5 4 3 3 2 1 0</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>2\n1 2\n2\n3 4</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Merged array in ascending order:\n1 2 3 4\nMerged array in descending order:\n4 3 2 1</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "4\n3 5 1 2\n5\n3 4 0 9 33",
        "expected": "Merged array in ascending order:\n0 1 2 3 3 4 5 9 33\nMerged array in descending order:\n33 9 5 4 3 3 2 1 0",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "2\n1 2\n2\n3 4",
        "expected": "Merged array in ascending order:\n1 2 3 4\nMerged array in descending order:\n4 3 2 1",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "1\n5\n1\n2",
        "expected": "Merged array in ascending order:\n2 5\nMerged array in descending order:\n5 2",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "3\n-5 0 5\n3\n-5 0 5",
        "expected": "Merged array in ascending order:\n-5 -5 0 0 5 5\nMerged array in descending order:\n5 5 0 0 -5 -5",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n9 7 5 3 1\n4\n2 4 6 8",
        "expected": "Merged array in ascending order:\n1 2 3 4 5 6 7 8 9\nMerged array in descending order:\n9 8 7 6 5 4 3 2 1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1\n-42\n2\n-42 42",
        "expected": "Merged array in ascending order:\n-42 -42 42\nMerged array in descending order:\n42 -42 -42",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "4\n4 4 4 4\n3\n1 2 3",
        "expected": "Merged array in ascending order:\n1 2 3 4 4 4 4\nMerged array in descending order:\n4 4 4 4 3 2 1",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
  {
    "id": "l3-p46-cosine",
    "title": "46. Calculating Cosine Values",
    "difficulty": "Medium",
    "level": 3,
    "description": "Take the number of angles, then read angles (doubles). Calculate and print the cosine for each (convert to radians first with M_PI/180.0). Output: 'Angle %.2f is %.2f\\n'.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>4\n56 78 99 45</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Angle 56.00 is 0.56\nAngle 78.00 is 0.21\nAngle 99.00 is -0.16\nAngle 45.00 is 0.71</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>2\n0 90</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Angle 0.00 is 1.00\nAngle 90.00 is 0.00</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "4\n56 78 99 45",
        "expected": "Angle 56.00 is 0.56\nAngle 78.00 is 0.21\nAngle 99.00 is -0.16\nAngle 45.00 is 0.71",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "2\n0 90",
        "expected": "Angle 0.00 is 1.00\nAngle 90.00 is 0.00",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "1\n180",
        "expected": "Angle 180.00 is -1.00",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "3\n30 60 45",
        "expected": "Angle 30.00 is 0.87\nAngle 60.00 is 0.50\nAngle 45.00 is 0.71",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2\n-90 360",
        "expected": "Angle -90.00 is 0.00\nAngle 360.00 is 1.00",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1\n37.5",
        "expected": "Angle 37.50 is 0.79",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4\n120 135 150 210",
        "expected": "Angle 120.00 is -0.50\nAngle 135.00 is -0.71\nAngle 150.00 is -0.87\nAngle 210.00 is -0.87",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p47-min-max-temp",
    "title": "47. Min and Max",
    "difficulty": "Easy",
    "level": 3,
    "description": "Print the minimum and maximum element in an array of integers. Output: 'Min = %d\\nMax = %d\\n'.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>4\n6 0 70 2</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Min = 0\nMax = 70</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>4\n-9 0 8 7</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Min = -9\nMax = 8</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "4\n6 0 70 2",
        "expected": "Min = 0\nMax = 70",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4\n-9 0 8 7",
        "expected": "Min = -9\nMax = 8",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3\n10 10 10",
        "expected": "Min = 10\nMax = 10",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1\n-5",
        "expected": "Min = -5\nMax = -5",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "6\n100 -100 50 -50 0 25",
        "expected": "Min = -100\nMax = 100",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "5\n-3 -7 -1 -9 -5",
        "expected": "Min = -9\nMax = -1",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "4\n2147483647 -2147483648 0 1",
        "expected": "Min = -2147483648\nMax = 2147483647",
        "hidden": true,
        "matchType": "normalized"
      }
    ]
  },
  {
    "id": "l3-p48-consecutive-duplicate",
    "title": "48. Consecutive Duplicate Removal",
    "difficulty": "Medium",
    "level": 3,
    "description": "Remove strictly continuous duplicates. Output: 'Output (without continuous duplicates):\\n' followed by the elements.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>6\n1 1 3 4 3 5</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Output (without continuous duplicates):\n1 3 4 3 5</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>4\n2 2 2 2</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Output (without continuous duplicates):\n2</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "6\n1 1 3 4 3 5",
        "expected": "Output (without continuous duplicates):\n1 3 4 3 5",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "4\n2 2 2 2",
        "expected": "Output (without continuous duplicates):\n2",
        "hidden": false,
        "matchType": "numeric"
      },
      {
        "input": "3\n1 2 3",
        "expected": "Output (without continuous duplicates):\n1 2 3",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "8\n1 2 2 3 3 3 4 4",
        "expected": "Output (without continuous duplicates):\n1 2 3 4",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "5\n-1 -1 0 0 -1",
        "expected": "Output (without continuous duplicates):\n-1 0 -1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1\n7",
        "expected": "Output (without continuous duplicates):\n7",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "7\n5 5 4 4 3 2 2",
        "expected": "Output (without continuous duplicates):\n5 4 3 2",
        "hidden": true,
        "matchType": "numeric"
      }
    ]
  },
{
    "id": "l1-ticket-cost-discount",
    "title": "15. Ticket Cost with Discount",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read the number of children, adult and senior tickets purchased. Children tickets cost $5, adult tickets cost $10 and senior tickets cost $7. If the total number of tickets is more than 5, apply a 10% discount on the total cost. Print the final cost with exactly 2 decimal places.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>2\n3\n1</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>42.30</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>1\n1\n1</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>22.00</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "2\n3\n1", "expected": "42.30", "hidden": false, "matchType": "normalized" },
      { "input": "1\n1\n1", "expected": "22.00", "hidden": false, "matchType": "normalized" },
      { "input": "0\n3\n2", "expected": "44.00", "hidden": false, "matchType": "normalized" },
      { "input": "5\n1\n0", "expected": "31.50", "hidden": true, "matchType": "normalized" },
      { "input": "0\n0\n0", "expected": "0.00", "hidden": true, "matchType": "normalized" },
      { "input": "10\n10\n10", "expected": "198.00", "hidden": true, "matchType": "normalized" },
      { "input": "0\n5\n0", "expected": "50.00", "hidden": true, "matchType": "normalized" },
      { "input": "3\n2\n1", "expected": "37.80", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-alphabet-check",
    "title": "16. Alphabet Check",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read a single character from input. Check whether it is an alphabet (a-z or A-Z). If it is, print \"&lt;ch&gt; is an Alphabet.\", otherwise print \"&lt;ch&gt; is not an Alphabet.\" with the character echoed in the message.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>a</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>a is an Alphabet.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>7</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>7 is not an Alphabet.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "a", "expected": "a is an Alphabet.", "hidden": false, "matchType": "normalized" },
      { "input": "7", "expected": "7 is not an Alphabet.", "hidden": false, "matchType": "normalized" },
      { "input": "Z", "expected": "Z is an Alphabet.", "hidden": false, "matchType": "normalized" },
      { "input": "m", "expected": "m is an Alphabet.", "hidden": true, "matchType": "normalized" },
      { "input": "@", "expected": "@ is not an Alphabet.", "hidden": true, "matchType": "normalized" },
      { "input": "Q", "expected": "Q is an Alphabet.", "hidden": true, "matchType": "normalized" },
      { "input": "0", "expected": "0 is not an Alphabet.", "hidden": true, "matchType": "normalized" },
      { "input": "z", "expected": "z is an Alphabet.", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-greater-or-equal",
    "title": "17. Greater or Equal",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read two integers. If the first is greater, print \"&lt;num1&gt; is greater than &lt;num2&gt;.\" If the second is greater, print \"&lt;num2&gt; is greater than &lt;num1&gt;.\" If they are equal, print \"&lt;num1&gt; is equal to &lt;num2&gt;.\"</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>5\n3</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>5 is greater than 3.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>4\n4</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>4 is equal to 4.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "5\n3", "expected": "5 is greater than 3.", "hidden": false, "matchType": "normalized" },
      { "input": "4\n4", "expected": "4 is equal to 4.", "hidden": false, "matchType": "normalized" },
      { "input": "2\n9", "expected": "9 is greater than 2.", "hidden": false, "matchType": "normalized" },
      { "input": "-3\n-7", "expected": "-3 is greater than -7.", "hidden": true, "matchType": "normalized" },
      { "input": "0\n0", "expected": "0 is equal to 0.", "hidden": true, "matchType": "normalized" },
      { "input": "-5\n10", "expected": "10 is greater than -5.", "hidden": true, "matchType": "normalized" },
      { "input": "100\n99", "expected": "100 is greater than 99.", "hidden": true, "matchType": "normalized" },
      { "input": "7\n7", "expected": "7 is equal to 7.", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-hex-octal",
    "title": "18. Hexadecimal and Octal",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read an integer. If it is not a positive integer (zero or negative), print \"Error: Please enter a positive integer\". Otherwise print its lowercase hexadecimal representation followed by \"(Hexadecimal)\" on the first line, and its octal representation followed by \"(Octal)\" on the second line.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>255</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>ff(Hexadecimal)\n377(Octal)</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>-5</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Error: Please enter a positive integer</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "255", "expected": "ff(Hexadecimal)\n377(Octal)", "hidden": false, "matchType": "normalized" },
      { "input": "-5", "expected": "Error: Please enter a positive integer", "hidden": false, "matchType": "normalized" },
      { "input": "16", "expected": "10(Hexadecimal)\n20(Octal)", "hidden": false, "matchType": "normalized" },
      { "input": "0", "expected": "Error: Please enter a positive integer", "hidden": true, "matchType": "normalized" },
      { "input": "10", "expected": "a(Hexadecimal)\n12(Octal)", "hidden": true, "matchType": "normalized" },
      { "input": "1", "expected": "1(Hexadecimal)\n1(Octal)", "hidden": true, "matchType": "normalized" },
      { "input": "100", "expected": "64(Hexadecimal)\n144(Octal)", "hidden": true, "matchType": "normalized" },
      { "input": "-100", "expected": "Error: Please enter a positive integer", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-battery-level",
    "title": "19. Battery Level Classifier",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read a battery charge level (0-100). Print \"Low\" for 0-20, \"Medium\" for 21-70, \"Almost Full\" for 71-95 and \"Full\" for 96-100. For any value below 0 or above 100, print \"INVALID CHARGE LEVEL\".</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>10</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Low</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>85</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Almost Full</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "10", "expected": "Low", "hidden": false, "matchType": "normalized" },
      { "input": "85", "expected": "Almost Full", "hidden": false, "matchType": "normalized" },
      { "input": "50", "expected": "Medium", "hidden": false, "matchType": "normalized" },
      { "input": "20", "expected": "Low", "hidden": true, "matchType": "normalized" },
      { "input": "21", "expected": "Medium", "hidden": true, "matchType": "normalized" },
      { "input": "95", "expected": "Almost Full", "hidden": true, "matchType": "normalized" },
      { "input": "96", "expected": "Full", "hidden": true, "matchType": "normalized" },
      { "input": "101", "expected": "INVALID CHARGE LEVEL", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-sum-parity-signs",
    "title": "20. Sum Parity and Signs",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read two integers. On the first line print \"even\" if their sum is even, otherwise \"odd\". On the second line print \"Both integers are positive.\" if both are positive, \"Both integers are negative.\" if both are negative, otherwise print \"One integer is positive and the other is negative.\" (Zero counts as neither positive nor negative.)</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>3\n4</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>odd\nBoth integers are positive.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>0\n5</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>odd\nOne integer is positive and the other is negative.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "3\n4", "expected": "odd\nBoth integers are positive.", "hidden": false, "matchType": "normalized" },
      { "input": "0\n5", "expected": "odd\nOne integer is positive and the other is negative.", "hidden": false, "matchType": "normalized" },
      { "input": "-2\n-8", "expected": "even\nBoth integers are negative.", "hidden": false, "matchType": "normalized" },
      { "input": "2\n2", "expected": "even\nBoth integers are positive.", "hidden": true, "matchType": "normalized" },
      { "input": "-3\n5", "expected": "even\nOne integer is positive and the other is negative.", "hidden": true, "matchType": "normalized" },
      { "input": "0\n0", "expected": "even\nOne integer is positive and the other is negative.", "hidden": true, "matchType": "normalized" },
      { "input": "-1\n-2", "expected": "odd\nBoth integers are negative.", "hidden": true, "matchType": "normalized" },
      { "input": "10\n-3", "expected": "odd\nOne integer is positive and the other is negative.", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-speed-classifier",
    "title": "21. Speed Classifier",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read distance and time as decimal numbers and compute speed as distance divided by time. Print the speed with exactly 2 decimal places. On the next line print \"Very slow\" if speed is below 50, \"Over speed\" if speed is above 120, otherwise print \"Average speed\" (speeds of exactly 50 and 120 count as average).</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>100\n2</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>50.00\nAverage speed</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>300\n2</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>150.00\nOver speed</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "100\n2", "expected": "50.00\nAverage speed", "hidden": false, "matchType": "normalized" },
      { "input": "300\n2", "expected": "150.00\nOver speed", "hidden": false, "matchType": "normalized" },
      { "input": "30\n1", "expected": "30.00\nVery slow", "hidden": false, "matchType": "normalized" },
      { "input": "240\n2", "expected": "120.00\nAverage speed", "hidden": true, "matchType": "normalized" },
      { "input": "49\n1", "expected": "49.00\nVery slow", "hidden": true, "matchType": "normalized" },
      { "input": "121\n1", "expected": "121.00\nOver speed", "hidden": true, "matchType": "normalized" },
      { "input": "75\n2", "expected": "37.50\nVery slow", "hidden": true, "matchType": "normalized" },
      { "input": "200\n1", "expected": "200.00\nOver speed", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-shipping-cost",
    "title": "22. Shipping Cost",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read the order total as a decimal number. If the total is negative, print \"INVALID AMOUNT.\". If the total is above 50, print the total with 2 decimal places followed by \" Shipping is free.\". Otherwise (including exactly 50), print the total with 2 decimal places followed by \" Shipping fee is $5.\".</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>60</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>60.00 Shipping is free.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>30</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>30.00 Shipping fee is $5.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "60", "expected": "60.00 Shipping is free.", "hidden": false, "matchType": "normalized" },
      { "input": "30", "expected": "30.00 Shipping fee is $5.", "hidden": false, "matchType": "normalized" },
      { "input": "-10", "expected": "INVALID AMOUNT.", "hidden": false, "matchType": "normalized" },
      { "input": "50", "expected": "50.00 Shipping fee is $5.", "hidden": true, "matchType": "normalized" },
      { "input": "50.5", "expected": "50.50 Shipping is free.", "hidden": true, "matchType": "normalized" },
      { "input": "0", "expected": "0.00 Shipping fee is $5.", "hidden": true, "matchType": "normalized" },
      { "input": "100", "expected": "100.00 Shipping is free.", "hidden": true, "matchType": "normalized" },
      { "input": "-0.5", "expected": "INVALID AMOUNT.", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-equal-product-difference",
    "title": "23. Equal Product or Difference",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read two integers. If they are equal, print their product. Otherwise print the absolute difference between them.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>4\n4</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>16</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>10\n3</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>7</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "4\n4", "expected": "16", "hidden": false, "matchType": "normalized" },
      { "input": "10\n3", "expected": "7", "hidden": false, "matchType": "normalized" },
      { "input": "3\n10", "expected": "7", "hidden": false, "matchType": "normalized" },
      { "input": "0\n0", "expected": "0", "hidden": true, "matchType": "normalized" },
      { "input": "-5\n-5", "expected": "25", "hidden": true, "matchType": "normalized" },
      { "input": "-5\n5", "expected": "10", "hidden": true, "matchType": "normalized" },
      { "input": "7\n2", "expected": "5", "hidden": true, "matchType": "normalized" },
      { "input": "1\n1", "expected": "1", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-theater-seat",
    "title": "24. Theater Seat Locator",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read a theater seat number. First print \"even\" or \"odd\". For an even seat, print \"back of the theater\" if it is divisible by 4, otherwise \"middle of the theater\". For an odd seat, print \"back of the theater\" if it is divisible by 3, otherwise \"front of the theater\".</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>8</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>even\nback of the theater</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>7</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>odd\nfront of the theater</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "8", "expected": "even\nback of the theater", "hidden": false, "matchType": "normalized" },
      { "input": "7", "expected": "odd\nfront of the theater", "hidden": false, "matchType": "normalized" },
      { "input": "6", "expected": "even\nmiddle of the theater", "hidden": false, "matchType": "normalized" },
      { "input": "9", "expected": "odd\nback of the theater", "hidden": true, "matchType": "normalized" },
      { "input": "12", "expected": "even\nback of the theater", "hidden": true, "matchType": "normalized" },
      { "input": "10", "expected": "even\nmiddle of the theater", "hidden": true, "matchType": "normalized" },
      { "input": "15", "expected": "odd\nback of the theater", "hidden": true, "matchType": "normalized" },
      { "input": "1", "expected": "odd\nfront of the theater", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-product-half-third",
    "title": "25. Product Half or Third",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read two integers and compute their product. If the product is even, print the product divided by 2. Otherwise print the product divided by 3. Division is integer division (the fractional part is dropped).</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>4\n6</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>12</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>5\n7</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>11</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "4\n6", "expected": "12", "hidden": false, "matchType": "normalized" },
      { "input": "5\n7", "expected": "11", "hidden": false, "matchType": "normalized" },
      { "input": "3\n3", "expected": "3", "hidden": false, "matchType": "normalized" },
      { "input": "2\n5", "expected": "5", "hidden": true, "matchType": "normalized" },
      { "input": "1\n1", "expected": "0", "hidden": true, "matchType": "normalized" },
      { "input": "0\n9", "expected": "0", "hidden": true, "matchType": "normalized" },
      { "input": "-4\n3", "expected": "-6", "hidden": true, "matchType": "normalized" },
      { "input": "-3\n-5", "expected": "5", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-five-digit-check",
    "title": "26. Five-Digit Check",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read an integer. If it is a 5-digit number (from 10000 to 99999), print \"&lt;num&gt; is a 5-digit number\". Otherwise print \"&lt;num&gt; is not a 5-digit number\".</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>12345</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>12345 is a 5-digit number</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>999</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>999 is not a 5-digit number</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "12345", "expected": "12345 is a 5-digit number", "hidden": false, "matchType": "normalized" },
      { "input": "999", "expected": "999 is not a 5-digit number", "hidden": false, "matchType": "normalized" },
      { "input": "-12345", "expected": "-12345 is not a 5-digit number", "hidden": false, "matchType": "normalized" },
      { "input": "10000", "expected": "10000 is a 5-digit number", "hidden": true, "matchType": "normalized" },
      { "input": "99999", "expected": "99999 is a 5-digit number", "hidden": true, "matchType": "normalized" },
      { "input": "100000", "expected": "100000 is not a 5-digit number", "hidden": true, "matchType": "normalized" },
      { "input": "0", "expected": "0 is not a 5-digit number", "hidden": true, "matchType": "normalized" },
      { "input": "54321", "expected": "54321 is a 5-digit number", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-income-tax-slabs",
    "title": "27. Income Tax Slabs",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read an income amount. Compute tax using slabs: 5% for income up to 10000, 10% for income up to 50000, and 20% for income above 50000. Print the tax as \"$&lt;amount&gt;\" with exactly 2 decimal places.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>10000</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>$500.00</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>60000</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>$12000.00</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "10000", "expected": "$500.00", "hidden": false, "matchType": "normalized" },
      { "input": "60000", "expected": "$12000.00", "hidden": false, "matchType": "normalized" },
      { "input": "50000", "expected": "$5000.00", "hidden": false, "matchType": "normalized" },
      { "input": "0", "expected": "$0.00", "hidden": true, "matchType": "normalized" },
      { "input": "10001", "expected": "$1000.10", "hidden": true, "matchType": "normalized" },
      { "input": "50001", "expected": "$10000.20", "hidden": true, "matchType": "normalized" },
      { "input": "25000", "expected": "$2500.00", "hidden": true, "matchType": "normalized" },
      { "input": "100000", "expected": "$20000.00", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-vehicle-validator",
    "title": "28. Vehicle Validator",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read a vehicle size code (S/M/L), a fuel type code (G/D/E) and a purpose code (1/2/3). Print \"Vehicle Size: \" followed by Small, Medium, Large or \"Invalid vehicle size\" (stop here if invalid). Then print \"Fuel Type: \" followed by Gasoline, Diesel, Electric or \"Invalid fuel type\" (stop here if invalid). Then print \"Purpose: \" followed by \"Personal use\", \"Commercial use\", \"Public Transport\" or \"Invalid purpose\".</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>M\nD\n2</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Vehicle Size: Medium\nFuel Type: Diesel\nPurpose: Commercial use</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>X\nG\n1</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Vehicle Size: Invalid vehicle size</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "M\nD\n2", "expected": "Vehicle Size: Medium\nFuel Type: Diesel\nPurpose: Commercial use", "hidden": false, "matchType": "normalized" },
      { "input": "X\nG\n1", "expected": "Vehicle Size: Invalid vehicle size", "hidden": false, "matchType": "normalized" },
      { "input": "S\nG\n1", "expected": "Vehicle Size: Small\nFuel Type: Gasoline\nPurpose: Personal use", "hidden": false, "matchType": "normalized" },
      { "input": "L\nE\n3", "expected": "Vehicle Size: Large\nFuel Type: Electric\nPurpose: Public Transport", "hidden": true, "matchType": "normalized" },
      { "input": "M\nX\n1", "expected": "Vehicle Size: Medium\nFuel Type: Invalid fuel type", "hidden": true, "matchType": "normalized" },
      { "input": "M\nD\n5", "expected": "Vehicle Size: Medium\nFuel Type: Diesel\nPurpose: Invalid purpose", "hidden": true, "matchType": "normalized" },
      { "input": "S\nE\n2", "expected": "Vehicle Size: Small\nFuel Type: Electric\nPurpose: Commercial use", "hidden": true, "matchType": "normalized" },
      { "input": "L\nG\n3", "expected": "Vehicle Size: Large\nFuel Type: Gasoline\nPurpose: Public Transport", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-salary-increment",
    "title": "29. Salary Increment",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read the current salary and a percentage increment (both integers). Compute the new salary as current salary plus (current salary times percentage divided by 100) using integer arithmetic. Print the new salary as an integer.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>10000\n15</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>11500</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>50000\n10</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>55000</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "10000\n15", "expected": "11500", "hidden": false, "matchType": "normalized" },
      { "input": "50000\n10", "expected": "55000", "hidden": false, "matchType": "normalized" },
      { "input": "8000\n0", "expected": "8000", "hidden": false, "matchType": "normalized" },
      { "input": "9999\n10", "expected": "10998", "hidden": true, "matchType": "normalized" },
      { "input": "100000\n25", "expected": "125000", "hidden": true, "matchType": "normalized" },
      { "input": "1\n50", "expected": "1", "hidden": true, "matchType": "normalized" },
      { "input": "0\n10", "expected": "0", "hidden": true, "matchType": "normalized" },
      { "input": "20000\n7", "expected": "21400", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-power-calculator",
    "title": "30. Power Calculator",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read a base and an exponent (both integers). Compute base raised to the exponent using pow() and print the result as an integer.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>2\n10</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>1024</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>5\n3</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>125</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "2\n10", "expected": "1024", "hidden": false, "matchType": "normalized" },
      { "input": "5\n3", "expected": "125", "hidden": false, "matchType": "normalized" },
      { "input": "10\n0", "expected": "1", "hidden": false, "matchType": "normalized" },
      { "input": "3\n4", "expected": "81", "hidden": true, "matchType": "normalized" },
      { "input": "2\n0", "expected": "1", "hidden": true, "matchType": "normalized" },
      { "input": "0\n5", "expected": "0", "hidden": true, "matchType": "normalized" },
      { "input": "7\n2", "expected": "49", "hidden": true, "matchType": "normalized" },
      { "input": "2\n20", "expected": "1048576", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-activity-level",
    "title": "31. Activity Level Tracker",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read the number of steps and the time taken. Print the activity level: \"Level:0\" for fewer than 5000 steps, \"Level:25\" for 5000-9999 steps, \"Level:50\" for 10000-14999 steps and \"Level:100\" for 15000 or more steps. On the next line print the activity range (steps divided by time) with exactly 2 decimal places.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>4000\n2</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Level:0 \n2000.00</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>12000\n3</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Level:50 \n4000.00</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "4000\n2", "expected": "Level:0 \n2000.00", "hidden": false, "matchType": "normalized" },
      { "input": "12000\n3", "expected": "Level:50 \n4000.00", "hidden": false, "matchType": "normalized" },
      { "input": "8000\n4", "expected": "Level:25 \n2000.00", "hidden": false, "matchType": "normalized" },
      { "input": "20000\n5", "expected": "Level:100 \n4000.00", "hidden": true, "matchType": "normalized" },
      { "input": "5000\n2", "expected": "Level:25 \n2500.00", "hidden": true, "matchType": "normalized" },
      { "input": "9999\n3", "expected": "Level:25 \n3333.00", "hidden": true, "matchType": "normalized" },
      { "input": "14999\n2", "expected": "Level:50 \n7499.50", "hidden": true, "matchType": "normalized" },
      { "input": "15000\n4", "expected": "Level:100 \n3750.00", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-gross-salary",
    "title": "32. Gross Salary Calculator",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read the basic salary. Compute HRA and DA based on slabs: for basic up to 10000, HRA is 20% and DA is 80%; for basic up to 20000, HRA is 25% and DA is 90%; above 20000, HRA is 30% and DA is 95%. Gross salary is basic plus HRA plus DA. Print it with exactly 2 decimal places.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>10000</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>20000.00</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>30000</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>67500.00</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "10000", "expected": "20000.00", "hidden": false, "matchType": "normalized" },
      { "input": "30000", "expected": "67500.00", "hidden": false, "matchType": "normalized" },
      { "input": "20000", "expected": "43000.00", "hidden": false, "matchType": "normalized" },
      { "input": "5000", "expected": "10000.00", "hidden": true, "matchType": "normalized" },
      { "input": "10001", "expected": "21502.15", "hidden": true, "matchType": "normalized" },
      { "input": "20001", "expected": "45002.25", "hidden": true, "matchType": "normalized" },
      { "input": "15000", "expected": "32250.00", "hidden": true, "matchType": "normalized" },
      { "input": "0", "expected": "0.00", "hidden": true, "matchType": "normalized" }
    ]
  },
{
    "id": "l1-ticket-price-by-age",
    "title": "33. Ticket Price by Age",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read the age of a visitor and print the ticket price: 10 for children (age 0 to 12), 15 for teenagers (age 13 to 17), 20 for adults (age 18 to 60), and 12 for seniors (age 61 and above).</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>10</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>10</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>15</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>15</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>25</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>20</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "10", "expected": "10", "hidden": false, "matchType": "normalized" },
      { "input": "15", "expected": "15", "hidden": false, "matchType": "normalized" },
      { "input": "25", "expected": "20", "hidden": false, "matchType": "normalized" },
      { "input": "0", "expected": "10", "hidden": true, "matchType": "normalized" },
      { "input": "12", "expected": "10", "hidden": true, "matchType": "normalized" },
      { "input": "17", "expected": "15", "hidden": true, "matchType": "normalized" },
      { "input": "60", "expected": "20", "hidden": true, "matchType": "normalized" },
      { "input": "100", "expected": "12", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-exam-attendance-eligibility",
    "title": "34. Exam Attendance Eligibility",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read the total hours held and the hours attended, then compute the attendance percentage. If the percentage is 75 or more, print You are allowed to sit in the exam. Otherwise print You are not allowed to sit in the exam, followed by Apply for Condonation when the percentage is between 66 and 74, or Not eligible for Condonation when it is below 66.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>100\n80</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>You are allowed to sit in the exam</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>100\n70</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>You are not allowed to sit in the exam\nApply for Condonation</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>100\n50</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>You are not allowed to sit in the exam\nNot eligible for Condonation</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "100\n80", "expected": "You are allowed to sit in the exam", "hidden": false, "matchType": "normalized" },
      { "input": "100\n70", "expected": "You are not allowed to sit in the exam\nApply for Condonation", "hidden": false, "matchType": "normalized" },
      { "input": "100\n50", "expected": "You are not allowed to sit in the exam\nNot eligible for Condonation", "hidden": false, "matchType": "normalized" },
      { "input": "200\n150", "expected": "You are allowed to sit in the exam", "hidden": true, "matchType": "normalized" },
      { "input": "100\n74", "expected": "You are not allowed to sit in the exam\nApply for Condonation", "hidden": true, "matchType": "normalized" },
      { "input": "100\n66", "expected": "You are not allowed to sit in the exam\nApply for Condonation", "hidden": true, "matchType": "normalized" },
      { "input": "100\n65", "expected": "You are not allowed to sit in the exam\nNot eligible for Condonation", "hidden": true, "matchType": "normalized" },
      { "input": "40\n40", "expected": "You are allowed to sit in the exam", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-weird-or-not-weird",
    "title": "35. Weird or Not Weird",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read an integer n and classify it. If n is greater than 100, print Invalid Range. Otherwise: odd numbers print Weird; even numbers from 2 to 5 print Not Weird; even numbers from 6 to 20 print Weird; even numbers greater than 20 print Not Weird.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>3</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Weird</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>4</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Not Weird</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>18</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Weird</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "3", "expected": "Weird", "hidden": false, "matchType": "normalized" },
      { "input": "4", "expected": "Not Weird", "hidden": false, "matchType": "normalized" },
      { "input": "18", "expected": "Weird", "hidden": false, "matchType": "normalized" },
      { "input": "24", "expected": "Not Weird", "hidden": true, "matchType": "normalized" },
      { "input": "101", "expected": "Invalid Range", "hidden": true, "matchType": "normalized" },
      { "input": "100", "expected": "Not Weird", "hidden": true, "matchType": "normalized" },
      { "input": "20", "expected": "Weird", "hidden": true, "matchType": "normalized" },
      { "input": "2", "expected": "Not Weird", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-largest-smallest-of-three",
    "title": "36. Largest and Smallest of Three",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read three integers and print the largest on the first line and the smallest on the second line.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>5\n2\n8</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>8\n2</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>1\n1\n1</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>1\n1</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>-3\n-7\n-1</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>-1\n-7</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "5\n2\n8", "expected": "8\n2", "hidden": false, "matchType": "normalized" },
      { "input": "1\n1\n1", "expected": "1\n1", "hidden": false, "matchType": "normalized" },
      { "input": "-3\n-7\n-1", "expected": "-1\n-7", "hidden": false, "matchType": "normalized" },
      { "input": "10\n20\n30", "expected": "30\n10", "hidden": true, "matchType": "normalized" },
      { "input": "0\n-5\n5", "expected": "5\n-5", "hidden": true, "matchType": "normalized" },
      { "input": "9\n9\n3", "expected": "9\n3", "hidden": true, "matchType": "normalized" },
      { "input": "100\n50\n75", "expected": "100\n50", "hidden": true, "matchType": "normalized" },
      { "input": "-2\n-2\n-9", "expected": "-2\n-9", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-withdrawal-limit-account-type",
    "title": "37. Withdrawal Limit by Account Type",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read a withdrawal amount on the first line and an account type character on the second line (R for regular, P for premium). Print Invalid for any other account type. A regular account allows up to 500 and a premium account allows up to 1000; print Withdrawal successful. Please take your money when within the limit, otherwise print Withdrawal amount exceeds the limit for your account type!</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>300\nR</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Withdrawal successful. Please take your money</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>900\nP</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Withdrawal successful. Please take your money</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>600\nR</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Withdrawal amount exceeds the limit for your account type!</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "300\nR", "expected": "Withdrawal successful. Please take your money", "hidden": false, "matchType": "normalized" },
      { "input": "900\nP", "expected": "Withdrawal successful. Please take your money", "hidden": false, "matchType": "normalized" },
      { "input": "600\nR", "expected": "Withdrawal amount exceeds the limit for your account type!", "hidden": false, "matchType": "normalized" },
      { "input": "500\nR", "expected": "Withdrawal successful. Please take your money", "hidden": true, "matchType": "normalized" },
      { "input": "1000\nP", "expected": "Withdrawal successful. Please take your money", "hidden": true, "matchType": "normalized" },
      { "input": "1500\nP", "expected": "Withdrawal amount exceeds the limit for your account type!", "hidden": true, "matchType": "normalized" },
      { "input": "200\nX", "expected": "Invalid", "hidden": true, "matchType": "normalized" },
      { "input": "501\nR", "expected": "Withdrawal amount exceeds the limit for your account type!", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-temperature-converter",
    "title": "38. Temperature Converter",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read an integer temperature on the first line and a scale character on the second line (C or F). Convert Celsius to Fahrenheit or Fahrenheit to Celsius and print the result with two decimal places. Print Invalid scale entered for any other scale character.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>0\nC</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>32.00</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>32\nF</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>0.00</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>100\nX</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Invalid scale entered</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "0\nC", "expected": "32.00", "hidden": false, "matchType": "normalized" },
      { "input": "32\nF", "expected": "0.00", "hidden": false, "matchType": "normalized" },
      { "input": "100\nX", "expected": "Invalid scale entered", "hidden": false, "matchType": "normalized" },
      { "input": "100\nC", "expected": "212.00", "hidden": true, "matchType": "normalized" },
      { "input": "212\nF", "expected": "100.00", "hidden": true, "matchType": "normalized" },
      { "input": "-40\nC", "expected": "-40.00", "hidden": true, "matchType": "normalized" },
      { "input": "98\nF", "expected": "36.67", "hidden": true, "matchType": "normalized" },
      { "input": "37\nc", "expected": "Invalid scale entered", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-weather-classifier",
    "title": "39. Weather Classifier",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read a temperature and classify the weather: Sunny weather for 0 to 30, Cloudy weather for 31 to 60, Rainy weather for 61 to 80, and Snowy weather for 81 to 100. Print Invalid temperature for values below 0 or above 100.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>25</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Sunny weather</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>45</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Cloudy weather</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>75</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Rainy weather</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "25", "expected": "Sunny weather", "hidden": false, "matchType": "normalized" },
      { "input": "45", "expected": "Cloudy weather", "hidden": false, "matchType": "normalized" },
      { "input": "75", "expected": "Rainy weather", "hidden": false, "matchType": "normalized" },
      { "input": "90", "expected": "Snowy weather", "hidden": true, "matchType": "normalized" },
      { "input": "-5", "expected": "Invalid temperature", "hidden": true, "matchType": "normalized" },
      { "input": "0", "expected": "Sunny weather", "hidden": true, "matchType": "normalized" },
      { "input": "30", "expected": "Sunny weather", "hidden": true, "matchType": "normalized" },
      { "input": "100", "expected": "Snowy weather", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-cgpa-to-percentage",
    "title": "40. CGPA to Percentage",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read a CGPA value between 0 and 10 and print Invalid CGPA. CGPA must be between 0 and 10. for anything outside that range. Otherwise print the percentage (CGPA multiplied by 9.5) with two decimal places, followed by a remark: Excellent for 90 and above, Good for 80 and above, Average for 70 and above, Needs Improvement for above 50, and Poor otherwise.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>8.5</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>80.75\nRemark: Good</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>9.6</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>91.20\nRemark: Excellent</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>11</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Invalid CGPA. CGPA must be between 0 and 10.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "8.5", "expected": "80.75\nRemark: Good", "hidden": false, "matchType": "normalized" },
      { "input": "9.6", "expected": "91.20\nRemark: Excellent", "hidden": false, "matchType": "normalized" },
      { "input": "11", "expected": "Invalid CGPA. CGPA must be between 0 and 10.", "hidden": false, "matchType": "normalized" },
      { "input": "7.0", "expected": "66.50\nRemark: Needs Improvement", "hidden": true, "matchType": "normalized" },
      { "input": "5.0", "expected": "47.50\nRemark: Poor", "hidden": true, "matchType": "normalized" },
      { "input": "10", "expected": "95.00\nRemark: Excellent", "hidden": true, "matchType": "normalized" },
      { "input": "0", "expected": "0.00\nRemark: Poor", "hidden": true, "matchType": "normalized" },
      { "input": "-1", "expected": "Invalid CGPA. CGPA must be between 0 and 10.", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-miles-per-gallon",
    "title": "41. Miles Per Gallon",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read the miles driven and the gallons used, then print the miles per gallon with two decimal places. Classify the result as Poor for below 15, Average for 15 to 25, Good for 26 to 35, and Excellent otherwise.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>300\n20</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>15.00\nAverage</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>100\n10</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>10.00\nPoor</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>400\n10</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>40.00\nExcellent</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "300\n20", "expected": "15.00\nAverage", "hidden": false, "matchType": "normalized" },
      { "input": "100\n10", "expected": "10.00\nPoor", "hidden": false, "matchType": "normalized" },
      { "input": "400\n10", "expected": "40.00\nExcellent", "hidden": false, "matchType": "normalized" },
      { "input": "260\n10", "expected": "26.00\nGood", "hidden": true, "matchType": "normalized" },
      { "input": "500\n25", "expected": "20.00\nAverage", "hidden": true, "matchType": "normalized" },
      { "input": "120\n10", "expected": "12.00\nPoor", "hidden": true, "matchType": "normalized" },
      { "input": "700\n20", "expected": "35.00\nGood", "hidden": true, "matchType": "normalized" },
      { "input": "900\n20", "expected": "45.00\nExcellent", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-savings-calculator",
    "title": "42. Savings Calculator",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read the total income and the allowances, then compute the saving amount (income minus allowances) and the saving percentage. Print both on separate lines with two decimal places, each prefixed as shown in the samples.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>5000\n2000</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Saving Amount: 3000.00\nSaving Percentage: 60.00%</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>10000\n2500</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Saving Amount: 7500.00\nSaving Percentage: 75.00%</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>8000\n8000</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Saving Amount: 0.00\nSaving Percentage: 0.00%</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "5000\n2000", "expected": "Saving Amount: 3000.00\nSaving Percentage: 60.00%", "hidden": false, "matchType": "normalized" },
      { "input": "10000\n2500", "expected": "Saving Amount: 7500.00\nSaving Percentage: 75.00%", "hidden": false, "matchType": "normalized" },
      { "input": "8000\n8000", "expected": "Saving Amount: 0.00\nSaving Percentage: 0.00%", "hidden": false, "matchType": "normalized" },
      { "input": "12000\n3000", "expected": "Saving Amount: 9000.00\nSaving Percentage: 75.00%", "hidden": true, "matchType": "normalized" },
      { "input": "6000\n1500", "expected": "Saving Amount: 4500.00\nSaving Percentage: 75.00%", "hidden": true, "matchType": "normalized" },
      { "input": "9000\n4500", "expected": "Saving Amount: 4500.00\nSaving Percentage: 50.00%", "hidden": true, "matchType": "normalized" },
      { "input": "1000\n333", "expected": "Saving Amount: 667.00\nSaving Percentage: 66.70%", "hidden": true, "matchType": "normalized" },
      { "input": "7500\n1000", "expected": "Saving Amount: 6500.00\nSaving Percentage: 86.67%", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-attendance-medical-cause",
    "title": "43. Attendance with Medical Cause",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read the total days and the days absent, then compute the attendance percentage. If it is 75 percent or more, print the percentage with two decimals. Otherwise read a third input, a medical cause character: print the percentage if it is Y, or print Not Eligible for any other character.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>100\n10</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>90.00</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>100\n30\nY</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>70.00</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>100\n30\nN</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Not Eligible</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "100\n10", "expected": "90.00", "hidden": false, "matchType": "normalized" },
      { "input": "100\n30\nY", "expected": "70.00", "hidden": false, "matchType": "normalized" },
      { "input": "100\n30\nN", "expected": "Not Eligible", "hidden": false, "matchType": "normalized" },
      { "input": "200\n40", "expected": "80.00", "hidden": true, "matchType": "normalized" },
      { "input": "100\n25", "expected": "75.00", "hidden": true, "matchType": "normalized" },
      { "input": "50\n20\nY", "expected": "60.00", "hidden": true, "matchType": "normalized" },
      { "input": "50\n20\nN", "expected": "Not Eligible", "hidden": true, "matchType": "normalized" },
      { "input": "80\n30\nn", "expected": "Not Eligible", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-odd-product-formatter",
    "title": "44. Odd Product Formatter",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read two integers and compute their product. If both numbers are odd, print the product as a floating-point value with three decimal places; otherwise print the product as an integer.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>3\n5</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>15.000</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>4\n5</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>20</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>2\n8</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>16</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "3\n5", "expected": "15.000", "hidden": false, "matchType": "normalized" },
      { "input": "4\n5", "expected": "20", "hidden": false, "matchType": "normalized" },
      { "input": "2\n8", "expected": "16", "hidden": false, "matchType": "normalized" },
      { "input": "7\n9", "expected": "63.000", "hidden": true, "matchType": "normalized" },
      { "input": "1\n1", "expected": "1.000", "hidden": true, "matchType": "normalized" },
      { "input": "6\n7", "expected": "42", "hidden": true, "matchType": "normalized" },
      { "input": "-3\n5", "expected": "-15.000", "hidden": true, "matchType": "normalized" },
      { "input": "0\n9", "expected": "0", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-temperature-words",
    "title": "45. Temperature Words",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read a temperature and describe it in words: Freezing weather below 0, Very Cold weather from 1 to 8, Cold weather from 9 to 19, Normal temperature from 20 to 29, Hot from 30 to 39, and Very Hot otherwise.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>-5</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Freezing weather</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>5</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Very Cold weather</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>25</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Normal temperature</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "-5", "expected": "Freezing weather", "hidden": false, "matchType": "normalized" },
      { "input": "5", "expected": "Very Cold weather", "hidden": false, "matchType": "normalized" },
      { "input": "25", "expected": "Normal temperature", "hidden": false, "matchType": "normalized" },
      { "input": "0", "expected": "Very Hot", "hidden": true, "matchType": "normalized" },
      { "input": "15", "expected": "Cold weather", "hidden": true, "matchType": "normalized" },
      { "input": "35", "expected": "Hot", "hidden": true, "matchType": "normalized" },
      { "input": "50", "expected": "Very Hot", "hidden": true, "matchType": "normalized" },
      { "input": "29", "expected": "Normal temperature", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-vote-eligibility",
    "title": "46. Vote Eligibility",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read a person's age and check voting eligibility. Print the age followed by years eligible to vote when the age is 18 or more, otherwise print the age followed by years not eligible to vote.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>20</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>20 years eligible to vote</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>16</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>16 years not eligible to vote</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>18</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>18 years eligible to vote</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "20", "expected": "20 years eligible to vote", "hidden": false, "matchType": "normalized" },
      { "input": "16", "expected": "16 years not eligible to vote", "hidden": false, "matchType": "normalized" },
      { "input": "18", "expected": "18 years eligible to vote", "hidden": false, "matchType": "normalized" },
      { "input": "0", "expected": "0 years not eligible to vote", "hidden": true, "matchType": "normalized" },
      { "input": "65", "expected": "65 years eligible to vote", "hidden": true, "matchType": "normalized" },
      { "input": "17", "expected": "17 years not eligible to vote", "hidden": true, "matchType": "normalized" },
      { "input": "100", "expected": "100 years eligible to vote", "hidden": true, "matchType": "normalized" },
      { "input": "5", "expected": "5 years not eligible to vote", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-speed-limit-check",
    "title": "47. Speed Limit Check",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read the speed limit and the vehicle speed, each on its own line. If the vehicle speed exceeds the limit, print the vehicle speed followed immediately by km Speed limit violation (no space before km). Otherwise print the vehicle speed followed immediately by km within the speed limit.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>60\n80</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>80km Speed limit violation</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>60\n50</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>50km within the speed limit</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>60\n60</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>60km within the speed limit</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "60\n80", "expected": "80km Speed limit violation", "hidden": false, "matchType": "normalized" },
      { "input": "60\n50", "expected": "50km within the speed limit", "hidden": false, "matchType": "normalized" },
      { "input": "60\n60", "expected": "60km within the speed limit", "hidden": false, "matchType": "normalized" },
      { "input": "100\n120", "expected": "120km Speed limit violation", "hidden": true, "matchType": "normalized" },
      { "input": "80\n80", "expected": "80km within the speed limit", "hidden": true, "matchType": "normalized" },
      { "input": "50\n49", "expected": "49km within the speed limit", "hidden": true, "matchType": "normalized" },
      { "input": "40\n100", "expected": "100km Speed limit violation", "hidden": true, "matchType": "normalized" },
      { "input": "0\n10", "expected": "10km Speed limit violation", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-vowel-or-consonant",
    "title": "48. Vowel or Consonant",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read a single character and report what it is: print X is a Vowel. for vowels (a, e, i, o, u in either case), X is a Consonant. for other letters, and X is not a Letter. for anything else, where X is the input character.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>a</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>a is a Vowel.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>b</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>b is a Consonant.</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>5</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>5 is not a Letter.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "a", "expected": "a is a Vowel.", "hidden": false, "matchType": "normalized" },
      { "input": "b", "expected": "b is a Consonant.", "hidden": false, "matchType": "normalized" },
      { "input": "5", "expected": "5 is not a Letter.", "hidden": false, "matchType": "normalized" },
      { "input": "E", "expected": "E is a Vowel.", "hidden": true, "matchType": "normalized" },
      { "input": "Z", "expected": "Z is a Consonant.", "hidden": true, "matchType": "normalized" },
      { "input": "u", "expected": "u is a Vowel.", "hidden": true, "matchType": "normalized" },
      { "input": "m", "expected": "m is a Consonant.", "hidden": true, "matchType": "normalized" },
      { "input": "@", "expected": "@ is not a Letter.", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-helloworld-divisibility",
    "title": "49. HelloWorld Divisibility",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read an integer N and apply the divisibility rule: print HelloWorld if N is a multiple of both 3 and 5, Hello if it is a multiple of only 3, World if it is a multiple of only 5, and the number itself otherwise.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>15</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>HelloWorld</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>9</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Hello</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>10</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>World</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "15", "expected": "HelloWorld", "hidden": false, "matchType": "normalized" },
      { "input": "9", "expected": "Hello", "hidden": false, "matchType": "normalized" },
      { "input": "10", "expected": "World", "hidden": false, "matchType": "normalized" },
      { "input": "7", "expected": "7", "hidden": true, "matchType": "normalized" },
      { "input": "30", "expected": "HelloWorld", "hidden": true, "matchType": "normalized" },
      { "input": "6", "expected": "Hello", "hidden": true, "matchType": "normalized" },
      { "input": "25", "expected": "World", "hidden": true, "matchType": "normalized" },
      { "input": "13", "expected": "13", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-last-digit-symbols",
    "title": "50. Last Digit Symbols",
    "difficulty": "Medium",
    "level": 1,
    "description": "<p>Read a non-negative integer and inspect its last digit. If the last digit is divisible by both 2 and 4, print ** on the first line and *** on the second line. If it is even but not divisible by 4, print only **. Otherwise print Invalid.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>24</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>**\n***</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>12</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>**</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>13</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Invalid</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "24", "expected": "**\n***", "hidden": false, "matchType": "normalized" },
      { "input": "12", "expected": "**", "hidden": false, "matchType": "normalized" },
      { "input": "13", "expected": "Invalid", "hidden": false, "matchType": "normalized" },
      { "input": "10", "expected": "**\n***", "hidden": true, "matchType": "normalized" },
      { "input": "26", "expected": "**", "hidden": true, "matchType": "normalized" },
      { "input": "19", "expected": "Invalid", "hidden": true, "matchType": "normalized" },
      { "input": "48", "expected": "**\n***", "hidden": true, "matchType": "normalized" },
      { "input": "5", "expected": "Invalid", "hidden": true, "matchType": "normalized" }
    ]
  },
{
    "id": "l1-area-menu",
    "title": "51. Area Calculator Menu",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads a menu choice and calculates an area: choice 1 computes the area of a circle (PI = 22/7) from a radius, choice 2 computes the area of a rectangle from length and width, and choice 3 computes the area of a triangle from base and height. Print any other choice as invalid.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>1\n7</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Area of the circle: 154.00</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>2\n5\n4</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Area of the rectangle: 20.00</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>3\n6\n4</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Area of the triangle: 12.00</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "1\n7", "expected": "Area of the circle: 154.00", "hidden": false, "matchType": "normalized" },
      { "input": "2\n5\n4", "expected": "Area of the rectangle: 20.00", "hidden": false, "matchType": "normalized" },
      { "input": "3\n6\n4", "expected": "Area of the triangle: 12.00", "hidden": false, "matchType": "normalized" },
      { "input": "5", "expected": "Invalid Choice", "hidden": true, "matchType": "normalized" },
      { "input": "1\n10", "expected": "Area of the circle: 314.29", "hidden": true, "matchType": "normalized" },
      { "input": "2\n2.5\n4", "expected": "Area of the rectangle: 10.00", "hidden": true, "matchType": "normalized" },
      { "input": "3\n5\n5", "expected": "Area of the triangle: 12.50", "hidden": true, "matchType": "normalized" },
      { "input": "4", "expected": "Invalid Choice", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-xor-equal",
    "title": "52. XOR Equality Check",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads two integers and compares them using bitwise XOR without using the equality operator. If the XOR result is zero the integers are equal, otherwise they are not equal.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>5\n5</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>The two integers are equal.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>5\n7</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>The two integers are not equal.</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>0\n0</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>The two integers are equal.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "5\n5", "expected": "The two integers are equal.", "hidden": false, "matchType": "normalized" },
      { "input": "5\n7", "expected": "The two integers are not equal.", "hidden": false, "matchType": "normalized" },
      { "input": "0\n0", "expected": "The two integers are equal.", "hidden": false, "matchType": "normalized" },
      { "input": "-3\n-3", "expected": "The two integers are equal.", "hidden": true, "matchType": "normalized" },
      { "input": "10\n20", "expected": "The two integers are not equal.", "hidden": true, "matchType": "normalized" },
      { "input": "-1\n1", "expected": "The two integers are not equal.", "hidden": true, "matchType": "normalized" },
      { "input": "100\n100", "expected": "The two integers are equal.", "hidden": true, "matchType": "normalized" },
      { "input": "0\n1", "expected": "The two integers are not equal.", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-child-discount-ticket",
    "title": "53. Child Discount Ticket",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads an age and validates it: ages below 0 or above 100 are invalid. Ages 12 and under qualify for a child discount ticket, while older ages must purchase a regular ticket.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>10</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>You are 10 years old. Qualified for a child discount ticket.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>25</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>You are 25 years old. Purchase a regular ticket.</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>-5</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Invalid Age.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "10", "expected": "You are 10 years old. Qualified for a child discount ticket.", "hidden": false, "matchType": "normalized" },
      { "input": "25", "expected": "You are 25 years old. Purchase a regular ticket.", "hidden": false, "matchType": "normalized" },
      { "input": "-5", "expected": "Invalid Age.", "hidden": false, "matchType": "normalized" },
      { "input": "0", "expected": "You are 0 years old. Qualified for a child discount ticket.", "hidden": true, "matchType": "normalized" },
      { "input": "12", "expected": "You are 12 years old. Qualified for a child discount ticket.", "hidden": true, "matchType": "normalized" },
      { "input": "13", "expected": "You are 13 years old. Purchase a regular ticket.", "hidden": true, "matchType": "normalized" },
      { "input": "100", "expected": "You are 100 years old. Purchase a regular ticket.", "hidden": true, "matchType": "normalized" },
      { "input": "101", "expected": "Invalid Age.", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-even-or-odd",
    "title": "54. Even or Odd",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads an integer and prints whether it is an even number or an odd number.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>4</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>4 is an Even Number.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>7</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>7 is an Odd Number.</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>0</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>0 is an Even Number.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "4", "expected": "4 is an Even Number.", "hidden": false, "matchType": "normalized" },
      { "input": "7", "expected": "7 is an Odd Number.", "hidden": false, "matchType": "normalized" },
      { "input": "0", "expected": "0 is an Even Number.", "hidden": false, "matchType": "normalized" },
      { "input": "-3", "expected": "-3 is an Odd Number.", "hidden": true, "matchType": "normalized" },
      { "input": "-8", "expected": "-8 is an Even Number.", "hidden": true, "matchType": "normalized" },
      { "input": "1", "expected": "1 is an Odd Number.", "hidden": true, "matchType": "normalized" },
      { "input": "100", "expected": "100 is an Even Number.", "hidden": true, "matchType": "normalized" },
      { "input": "-1", "expected": "-1 is an Odd Number.", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-height-category",
    "title": "55. Height Category",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads a height and classifies it: below 150 is short, 151 to 170 is average height, 171 to 190 is tall, and anything else is very tall.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>140</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>short</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>160</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>average height</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>180</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>tall</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "140", "expected": "short", "hidden": false, "matchType": "normalized" },
      { "input": "160", "expected": "average height", "hidden": false, "matchType": "normalized" },
      { "input": "180", "expected": "tall", "hidden": false, "matchType": "normalized" },
      { "input": "150", "expected": "very tall", "hidden": true, "matchType": "normalized" },
      { "input": "200", "expected": "very tall", "hidden": true, "matchType": "normalized" },
      { "input": "151", "expected": "average height", "hidden": true, "matchType": "normalized" },
      { "input": "170", "expected": "average height", "hidden": true, "matchType": "normalized" },
      { "input": "171", "expected": "tall", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-divisible-4-6",
    "title": "56. Divisible by 4 and 6",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads a number and first rejects negative values. For a non-negative number, print whether it is divisible by both 4 and 6.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>24</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>24 is divisible by both 4 and 6.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>8</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>8 is not divisible by both 4 and 6.</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>-5</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Negative Values are not allowed.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "24", "expected": "24 is divisible by both 4 and 6.", "hidden": false, "matchType": "normalized" },
      { "input": "8", "expected": "8 is not divisible by both 4 and 6.", "hidden": false, "matchType": "normalized" },
      { "input": "-5", "expected": "Negative Values are not allowed.", "hidden": false, "matchType": "normalized" },
      { "input": "12", "expected": "12 is divisible by both 4 and 6.", "hidden": true, "matchType": "normalized" },
      { "input": "6", "expected": "6 is not divisible by both 4 and 6.", "hidden": true, "matchType": "normalized" },
      { "input": "0", "expected": "0 is divisible by both 4 and 6.", "hidden": true, "matchType": "normalized" },
      { "input": "18", "expected": "18 is not divisible by both 4 and 6.", "hidden": true, "matchType": "normalized" },
      { "input": "36", "expected": "36 is divisible by both 4 and 6.", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-quarter-days",
    "title": "57. Quarter and Days",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads a month number and prints its quarter of the year (First, Second, Third or Fourth) on the first line and the number of days in that month (28, 30 or 31, assuming a non-leap year) on the second line. Print an error for invalid months.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>1</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>First\n31</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>5</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Second\n31</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>2</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>First\n28</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "1", "expected": "First\n31", "hidden": false, "matchType": "normalized" },
      { "input": "5", "expected": "Second\n31", "hidden": false, "matchType": "normalized" },
      { "input": "2", "expected": "First\n28", "hidden": false, "matchType": "normalized" },
      { "input": "13", "expected": "Invalid Input", "hidden": true, "matchType": "normalized" },
      { "input": "0", "expected": "Invalid Input", "hidden": true, "matchType": "normalized" },
      { "input": "4", "expected": "Second\n30", "hidden": true, "matchType": "normalized" },
      { "input": "12", "expected": "Fourth\n31", "hidden": true, "matchType": "normalized" },
      { "input": "9", "expected": "Third\n30", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-engine-health",
    "title": "58. Engine Health Check",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads engine temperature, oil pressure and RPM, then evaluates engine health. Print Poor if temperature exceeds 80, oil pressure is below 10 or RPM exceeds 7000; otherwise print Fair if temperature exceeds 70, oil pressure is below 20 or RPM exceeds 5000; otherwise print Good.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>90\n30\n4000</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Poor</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>75\n25\n4000</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Fair</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>60\n30\n4000</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Good</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "90\n30\n4000", "expected": "Poor", "hidden": false, "matchType": "normalized" },
      { "input": "75\n25\n4000", "expected": "Fair", "hidden": false, "matchType": "normalized" },
      { "input": "60\n30\n4000", "expected": "Good", "hidden": false, "matchType": "normalized" },
      { "input": "70\n5\n4000", "expected": "Poor", "hidden": true, "matchType": "normalized" },
      { "input": "70\n15\n4000", "expected": "Fair", "hidden": true, "matchType": "normalized" },
      { "input": "70\n25\n8000", "expected": "Poor", "hidden": true, "matchType": "normalized" },
      { "input": "70\n25\n6000", "expected": "Fair", "hidden": true, "matchType": "normalized" },
      { "input": "70\n20\n5000", "expected": "Good", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-ascii-sum",
    "title": "59. ASCII Sum",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads two characters and prints the sum of their ASCII values as an integer.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>a\nb</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>195</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>A\nA</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>130</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>0\n0</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>96</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "a\nb", "expected": "195", "hidden": false, "matchType": "normalized" },
      { "input": "A\nA", "expected": "130", "hidden": false, "matchType": "normalized" },
      { "input": "0\n0", "expected": "96", "hidden": false, "matchType": "normalized" },
      { "input": "Z\nz", "expected": "212", "hidden": true, "matchType": "normalized" },
      { "input": "!\n?", "expected": "96", "hidden": true, "matchType": "normalized" },
      { "input": "9\nA", "expected": "122", "hidden": true, "matchType": "normalized" },
      { "input": "x\nx", "expected": "240", "hidden": true, "matchType": "normalized" },
      { "input": " \na", "expected": "129", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-month-days",
    "title": "60. Month Days",
    "difficulty": "Medium",
    "level": 1,
    "description": "<p>Write a C program using switch-case that reads a month number and prints the month name. For February, also read a year and report whether it is a leap year with 29 days or not with 28 days; other months print their day count. Print an error for invalid months.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>2\n2024</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>February\nLeap Year - 29 Days</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>1</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>January\n31 Days</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>13</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Invalid Month</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "2\n2024", "expected": "February\nLeap Year - 29 Days", "hidden": false, "matchType": "normalized" },
      { "input": "1", "expected": "January\n31 Days", "hidden": false, "matchType": "normalized" },
      { "input": "13", "expected": "Invalid Month", "hidden": false, "matchType": "normalized" },
      { "input": "2\n2023", "expected": "February\nNot a Leap Year - 28 Days", "hidden": true, "matchType": "normalized" },
      { "input": "2\n2000", "expected": "February\nLeap Year - 29 Days", "hidden": true, "matchType": "normalized" },
      { "input": "2\n1900", "expected": "February\nNot a Leap Year - 28 Days", "hidden": true, "matchType": "normalized" },
      { "input": "4", "expected": "April\n30 Days", "hidden": true, "matchType": "normalized" },
      { "input": "12", "expected": "December\n31 Days", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-distance-converter",
    "title": "61. Distance Converter",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads a distance value. If the value is greater than 1000, treat the input as meters and convert it to kilometers; otherwise treat the input as centimeters and convert it to meters. Print the result with two decimal places and the unit.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>1500</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>1.50 kilometers</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>500</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>5.00 meters</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>1000</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>10.00 meters</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "1500", "expected": "1.50 kilometers", "hidden": false, "matchType": "normalized" },
      { "input": "500", "expected": "5.00 meters", "hidden": false, "matchType": "normalized" },
      { "input": "1000", "expected": "10.00 meters", "hidden": false, "matchType": "normalized" },
      { "input": "2500", "expected": "2.50 kilometers", "hidden": true, "matchType": "normalized" },
      { "input": "1001", "expected": "1.00 kilometers", "hidden": true, "matchType": "normalized" },
      { "input": "50", "expected": "0.50 meters", "hidden": true, "matchType": "normalized" },
      { "input": "0", "expected": "0.00 meters", "hidden": true, "matchType": "normalized" },
      { "input": "999", "expected": "9.99 meters", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-triangle-validity",
    "title": "62. Triangle Validity",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads three side lengths and checks whether they can form a triangle. Reject any non-positive side, then verify the triangle inequality on all three pairs of sides.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>3\n4\n5</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Triangle is valid</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>1\n2\n5</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Triangle is not valid</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>0\n4\n5</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Triangle is not valid</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "3\n4\n5", "expected": "Triangle is valid", "hidden": false, "matchType": "normalized" },
      { "input": "1\n2\n5", "expected": "Triangle is not valid", "hidden": false, "matchType": "normalized" },
      { "input": "0\n4\n5", "expected": "Triangle is not valid", "hidden": false, "matchType": "normalized" },
      { "input": "5\n5\n5", "expected": "Triangle is valid", "hidden": true, "matchType": "normalized" },
      { "input": "1\n1\n2", "expected": "Triangle is not valid", "hidden": true, "matchType": "normalized" },
      { "input": "-3\n4\n5", "expected": "Triangle is not valid", "hidden": true, "matchType": "normalized" },
      { "input": "10\n10\n10", "expected": "Triangle is valid", "hidden": true, "matchType": "normalized" },
      { "input": "2\n3\n4", "expected": "Triangle is valid", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-unit-converter",
    "title": "63. Unit Converter",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads a value and a unit character. Convert kilometers to meters when the unit is 'k', and meters to kilometers when the unit is 'm', printing the result with two decimal places and the target unit. Reject any other unit.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>5\nk</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>5000.00 m</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>5000\nm</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>5.00 k</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>5\nx</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Invalid unit(s). Please enter valid units (m or k).</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "5\nk", "expected": "5000.00 m", "hidden": false, "matchType": "normalized" },
      { "input": "5000\nm", "expected": "5.00 k", "hidden": false, "matchType": "normalized" },
      { "input": "5\nx", "expected": "Invalid unit(s). Please enter valid units (m or k).", "hidden": false, "matchType": "normalized" },
      { "input": "2.5\nk", "expected": "2500.00 m", "hidden": true, "matchType": "normalized" },
      { "input": "1.5\nm", "expected": "0.00 k", "hidden": true, "matchType": "normalized" },
      { "input": "10\nK", "expected": "Invalid unit(s). Please enter valid units (m or k).", "hidden": true, "matchType": "normalized" },
      { "input": "0\nk", "expected": "0.00 m", "hidden": true, "matchType": "normalized" },
      { "input": "100\nm", "expected": "0.10 k", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-tom-jerry",
    "title": "64. Tom and Jerry",
    "difficulty": "Medium",
    "level": 1,
    "description": "<p>Write a C program that reads Tom's speed, Jerry's speed and the initial distance between them. If Tom is not faster than Jerry he can never catch him; otherwise compute the catch time as distance divided by the relative speed and print it with two decimal places.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>10\n20\n100</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Tom will catch Jerry in 10.00 seconds.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>20\n10\n100</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Tom will not be able to catch Jerry.</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>10\n10\n100</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Tom will not be able to catch Jerry.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "10\n20\n100", "expected": "Tom will catch Jerry in 10.00 seconds.", "hidden": false, "matchType": "normalized" },
      { "input": "20\n10\n100", "expected": "Tom will not be able to catch Jerry.", "hidden": false, "matchType": "normalized" },
      { "input": "10\n10\n100", "expected": "Tom will not be able to catch Jerry.", "hidden": false, "matchType": "normalized" },
      { "input": "5\n15\n75", "expected": "Tom will catch Jerry in 7.50 seconds.", "hidden": true, "matchType": "normalized" },
      { "input": "0\n3\n10", "expected": "Tom will catch Jerry in 3.33 seconds.", "hidden": true, "matchType": "normalized" },
      { "input": "8\n2\n50", "expected": "Tom will not be able to catch Jerry.", "hidden": true, "matchType": "normalized" },
      { "input": "1\n2\n7", "expected": "Tom will catch Jerry in 7.00 seconds.", "hidden": true, "matchType": "normalized" },
      { "input": "10\n12\n100", "expected": "Tom will catch Jerry in 50.00 seconds.", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-total-salary",
    "title": "65. Total Salary",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads an employee grade and basic salary, then computes the total salary as basic plus 20% HRA plus 50% DA plus a grade-based allowance (A:1700, B:1500, C:1300, D:1100, anything else:900) minus 11% PF. Print the result rounded to the nearest integer.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>A\n10000</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>17600</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>B\n10000</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>17400</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>E\n10000</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>17300</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "A\n10000", "expected": "17600", "hidden": false, "matchType": "normalized" },
      { "input": "B\n10000", "expected": "17400", "hidden": false, "matchType": "normalized" },
      { "input": "E\n10000", "expected": "17300", "hidden": false, "matchType": "normalized" },
      { "input": "C\n10000", "expected": "17200", "hidden": true, "matchType": "normalized" },
      { "input": "D\n5000", "expected": "9050", "hidden": true, "matchType": "normalized" },
      { "input": "A\n0", "expected": "1700", "hidden": true, "matchType": "normalized" },
      { "input": "B\n12345", "expected": "21129", "hidden": true, "matchType": "normalized" },
      { "input": "Z\n10000", "expected": "17300", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-letter-grade",
    "title": "66. Letter Grade",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads a score and prints the letter grade: A for 90 and above, B for 80 and above, C for 70 and above, D for 60 and above, and F otherwise.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>95</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>A</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>85</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>B</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>55</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>F</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "95", "expected": "A", "hidden": false, "matchType": "normalized" },
      { "input": "85", "expected": "B", "hidden": false, "matchType": "normalized" },
      { "input": "55", "expected": "F", "hidden": false, "matchType": "normalized" },
      { "input": "90", "expected": "A", "hidden": true, "matchType": "normalized" },
      { "input": "80", "expected": "B", "hidden": true, "matchType": "normalized" },
      { "input": "70", "expected": "C", "hidden": true, "matchType": "normalized" },
      { "input": "60", "expected": "D", "hidden": true, "matchType": "normalized" },
      { "input": "59", "expected": "F", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-point-quadrant",
    "title": "67. Point Quadrant",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads the x and y coordinates of a point and reports its position: Origin when both are zero, Y-axis or X-axis when exactly one is zero, otherwise the quadrant (First, Second, Third or Fourth) it lies in.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>3\n4</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>First Quadrant</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>-3\n4</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Second Quadrant</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>0\n0</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Origin</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "3\n4", "expected": "First Quadrant", "hidden": false, "matchType": "normalized" },
      { "input": "-3\n4", "expected": "Second Quadrant", "hidden": false, "matchType": "normalized" },
      { "input": "0\n0", "expected": "Origin", "hidden": false, "matchType": "normalized" },
      { "input": "0\n5", "expected": "Y-axis", "hidden": true, "matchType": "normalized" },
      { "input": "5\n0", "expected": "X-axis", "hidden": true, "matchType": "normalized" },
      { "input": "-3\n-4", "expected": "Third Quadrant", "hidden": true, "matchType": "normalized" },
      { "input": "3\n-4", "expected": "Fourth Quadrant", "hidden": true, "matchType": "normalized" },
      { "input": "-1\n1", "expected": "Second Quadrant", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-bmi-calculator",
    "title": "68. BMI Calculator",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads weight and height, validates that both are positive, and computes BMI as weight divided by height squared. Reject BMI values outside 0 to 50, then print the BMI with one decimal place followed by the category: Underweight (below 18.5), Normal weight (up to 25), Overweight (up to 30), or Obese.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>70\n1.75</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>22.9\nNormal weight</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>50\n1.8</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>15.4\nUnderweight</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>0\n1.75</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Error: Height | weight cannot be zero or negative</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "70\n1.75", "expected": "22.9\nNormal weight", "hidden": false, "matchType": "normalized" },
      { "input": "50\n1.8", "expected": "15.4\nUnderweight", "hidden": false, "matchType": "normalized" },
      { "input": "0\n1.75", "expected": "Error: Height | weight cannot be zero or negative", "hidden": false, "matchType": "normalized" },
      { "input": "90\n1.7", "expected": "31.1\nObese", "hidden": true, "matchType": "normalized" },
      { "input": "65\n1.6", "expected": "25.4\nOverweight", "hidden": true, "matchType": "normalized" },
      { "input": "200\n1.4", "expected": "Error", "hidden": true, "matchType": "normalized" },
      { "input": "45\n1.9", "expected": "12.5\nUnderweight", "hidden": true, "matchType": "normalized" },
      { "input": "70\n0", "expected": "Error: Height | weight cannot be zero or negative", "hidden": true, "matchType": "normalized" }
    ]
  },
{
    "id": "l1-compound-interest",
    "title": "69. Compound Interest",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads the principal amount P, the annual interest rate R and the time T in years, then calculates the compound interest using the formula CI = P * (1 + R/100)^T - P. Print the compound interest rounded to two decimal places.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>1000\n10\n2</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>210.00</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>2000\n5\n2</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>205.00</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>5000\n10\n1</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>500.00</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "1000\n10\n2", "expected": "210.00", "hidden": false, "matchType": "normalized" },
      { "input": "2000\n5\n2", "expected": "205.00", "hidden": false, "matchType": "normalized" },
      { "input": "5000\n10\n1", "expected": "500.00", "hidden": false, "matchType": "normalized" },
      { "input": "1500\n12\n2", "expected": "381.60", "hidden": true, "matchType": "normalized" },
      { "input": "500\n20\n3", "expected": "364.00", "hidden": true, "matchType": "normalized" },
      { "input": "10000\n8\n3", "expected": "2597.12", "hidden": true, "matchType": "normalized" },
      { "input": "2500\n4\n4", "expected": "424.65", "hidden": true, "matchType": "normalized" },
      { "input": "800\n15\n2", "expected": "258.00", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-taxi-fare",
    "title": "70. Taxi Fare",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads the distance travelled in km and calculates the taxi fare: $11 per km for the first 10 km, then $110 for the first 10 km plus $10 per km for every km beyond 10. Print the fare as an integer.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>5</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>55</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>10</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>110</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>15</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>160</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "5", "expected": "55", "hidden": false, "matchType": "normalized" },
      { "input": "10", "expected": "110", "hidden": false, "matchType": "normalized" },
      { "input": "15", "expected": "160", "hidden": false, "matchType": "normalized" },
      { "input": "1", "expected": "11", "hidden": true, "matchType": "normalized" },
      { "input": "11", "expected": "120", "hidden": true, "matchType": "normalized" },
      { "input": "20", "expected": "210", "hidden": true, "matchType": "normalized" },
      { "input": "25", "expected": "260", "hidden": true, "matchType": "normalized" },
      { "input": "100", "expected": "1010", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-grade-calculator",
    "title": "71. Grade Calculator",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads the marks of five subjects, validates that each mark is between 0 and 100, and prints the percentage with two decimal places. If any subject mark is 35 or below, print the failure message; otherwise print the grade (A for above 90, B for 81-90, C for 71-80, D for 61-70, E for 41-60, F otherwise).</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>90\n85\n88\n92\n80</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>87.00%\nGrade B</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>70\n72\n68\n75\n71</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>71.20%\nGrade C</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>50\n30\n60\n55\n58</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>50.60%\nFailed! You need to score above 35 in all subjects</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "90\n85\n88\n92\n80", "expected": "87.00%\nGrade B", "hidden": false, "matchType": "normalized" },
      { "input": "70\n72\n68\n75\n71", "expected": "71.20%\nGrade C", "hidden": false, "matchType": "normalized" },
      { "input": "50\n30\n60\n55\n58", "expected": "50.60%\nFailed! You need to score above 35 in all subjects", "hidden": false, "matchType": "normalized" },
      { "input": "101\n80\n80\n80\n80", "expected": "Invalid input! Marks must be between 0 and 100.", "hidden": true, "matchType": "normalized" },
      { "input": "-5\n80\n80\n80\n80", "expected": "Invalid input! Marks must be between 0 and 100.", "hidden": true, "matchType": "normalized" },
      { "input": "90\n90\n90\n90\n90", "expected": "90.00%\nGrade B", "hidden": true, "matchType": "normalized" },
      { "input": "95\n96\n94\n98\n97", "expected": "96.00%\nGrade A", "hidden": true, "matchType": "normalized" },
      { "input": "36\n37\n38\n36\n39", "expected": "37.20%\nGrade F", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-stationery-cost",
    "title": "72. Stationery Cost",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads the number of pens, notebooks and pencils and calculates the total cost using unit prices of $8, $25 and $4 respectively. Print the total cost as an integer.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>2\n3\n5</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>111</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>1\n1\n1</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>37</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>0\n0\n0</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>0</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "2\n3\n5", "expected": "111", "hidden": false, "matchType": "normalized" },
      { "input": "1\n1\n1", "expected": "37", "hidden": false, "matchType": "normalized" },
      { "input": "0\n0\n0", "expected": "0", "hidden": false, "matchType": "normalized" },
      { "input": "10\n2\n4", "expected": "146", "hidden": true, "matchType": "normalized" },
      { "input": "5\n5\n5", "expected": "185", "hidden": true, "matchType": "normalized" },
      { "input": "3\n0\n10", "expected": "64", "hidden": true, "matchType": "normalized" },
      { "input": "0\n4\n0", "expected": "100", "hidden": true, "matchType": "normalized" },
      { "input": "7\n3\n8", "expected": "163", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-chocolate-days",
    "title": "73. Chocolate Days",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads the total chocolates available, the chocolates eaten per day and the planned number of days. If the chocolates are sufficient for the planned days, print 1; otherwise print 0 followed by the minimum number of whole days possible using integer division.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>100\n10\n8</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>1</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>50\n10\n8</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>0\n5</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>30\n7\n5</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>0\n4</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "100\n10\n8", "expected": "1", "hidden": false, "matchType": "normalized" },
      { "input": "50\n10\n8", "expected": "0\n5", "hidden": false, "matchType": "normalized" },
      { "input": "30\n7\n5", "expected": "0\n4", "hidden": false, "matchType": "normalized" },
      { "input": "20\n5\n4", "expected": "1", "hidden": true, "matchType": "normalized" },
      { "input": "0\n5\n3", "expected": "0\n0", "hidden": true, "matchType": "normalized" },
      { "input": "99\n10\n10", "expected": "0\n9", "hidden": true, "matchType": "normalized" },
      { "input": "25\n6\n4", "expected": "1", "hidden": true, "matchType": "normalized" },
      { "input": "17\n5\n4", "expected": "0\n3", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-season-finder",
    "title": "74. Season Finder",
    "difficulty": "Medium",
    "level": 1,
    "description": "<p>Write a C program that reads a month and day, validates them (month 1-12, correct days per month with February capped at 28), and prints the season. Spring runs March 20 to June 20, Summer June 21 to September 22, Autumn September 23 to December 20, and Winter covers the rest. Print Invalid for any invalid date.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>3\n21</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Spring</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>7\n15</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Summer</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>10\n5</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Autumn</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "3\n21", "expected": "Spring", "hidden": false, "matchType": "normalized" },
      { "input": "7\n15", "expected": "Summer", "hidden": false, "matchType": "normalized" },
      { "input": "10\n5", "expected": "Autumn", "hidden": false, "matchType": "normalized" },
      { "input": "1\n10", "expected": "Winter", "hidden": true, "matchType": "normalized" },
      { "input": "13\n5", "expected": "Invalid", "hidden": true, "matchType": "normalized" },
      { "input": "2\n30", "expected": "Invalid", "hidden": true, "matchType": "normalized" },
      { "input": "6\n20", "expected": "Spring", "hidden": true, "matchType": "normalized" },
      { "input": "12\n21", "expected": "Winter", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-sound-frequency",
    "title": "75. Sound Frequency",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads a frequency in Hertz and classifies it: below 20 Hz is Infrasound, 20 to 20000 Hz is Audible sound, and above 20000 Hz is Ultrasound. Print the result in the exact sentence format shown below.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>10</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>10.00 Hz is categorized as Infrasound.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>440</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>440.00 Hz is categorized as Audible sound.</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>25000</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>25000.00 Hz is categorized as Ultrasound.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "10", "expected": "10.00 Hz is categorized as Infrasound.", "hidden": false, "matchType": "normalized" },
      { "input": "440", "expected": "440.00 Hz is categorized as Audible sound.", "hidden": false, "matchType": "normalized" },
      { "input": "25000", "expected": "25000.00 Hz is categorized as Ultrasound.", "hidden": false, "matchType": "normalized" },
      { "input": "20", "expected": "20.00 Hz is categorized as Audible sound.", "hidden": true, "matchType": "normalized" },
      { "input": "20000", "expected": "20000.00 Hz is categorized as Audible sound.", "hidden": true, "matchType": "normalized" },
      { "input": "20001", "expected": "20001.00 Hz is categorized as Ultrasound.", "hidden": true, "matchType": "normalized" },
      { "input": "19", "expected": "19.00 Hz is categorized as Infrasound.", "hidden": true, "matchType": "normalized" },
      { "input": "1500", "expected": "1500.00 Hz is categorized as Audible sound.", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-salary-increment-rating",
    "title": "76. Salary Increment",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads an employee rating and current salary, then applies a 10% increment for rating 4 or above, 5% for rating 3, and no increment otherwise. Print the new salary with two decimal places.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>5\n50000</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>55000.00</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>3\n40000</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>42000.00</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>2\n30000</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>30000.00</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "5\n50000", "expected": "55000.00", "hidden": false, "matchType": "normalized" },
      { "input": "3\n40000", "expected": "42000.00", "hidden": false, "matchType": "normalized" },
      { "input": "2\n30000", "expected": "30000.00", "hidden": false, "matchType": "normalized" },
      { "input": "4\n60000", "expected": "66000.00", "hidden": true, "matchType": "normalized" },
      { "input": "1\n25000", "expected": "25000.00", "hidden": true, "matchType": "normalized" },
      { "input": "3\n100000", "expected": "105000.00", "hidden": true, "matchType": "normalized" },
      { "input": "5\n0", "expected": "0.00", "hidden": true, "matchType": "normalized" },
      { "input": "0\n50000", "expected": "50000.00", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-new-salary",
    "title": "77. New Salary",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads the current salary and a percentage increment, then calculates the new salary as current + current * (percentage / 100). Print the new salary with two decimal places.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>50000\n10</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>55000.00</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>40000\n5</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>42000.00</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>30000\n0</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>30000.00</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "50000\n10", "expected": "55000.00", "hidden": false, "matchType": "normalized" },
      { "input": "40000\n5", "expected": "42000.00", "hidden": false, "matchType": "normalized" },
      { "input": "30000\n0", "expected": "30000.00", "hidden": false, "matchType": "normalized" },
      { "input": "60000\n12", "expected": "67200.00", "hidden": true, "matchType": "normalized" },
      { "input": "100000\n25", "expected": "125000.00", "hidden": true, "matchType": "normalized" },
      { "input": "75000\n7", "expected": "80250.00", "hidden": true, "matchType": "normalized" },
      { "input": "20000\n15", "expected": "23000.00", "hidden": true, "matchType": "normalized" },
      { "input": "45000\n3", "expected": "46350.00", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-triangle-classifier",
    "title": "78. Triangle Classifier",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads three side lengths and first checks the triangle inequality. If valid, classify the triangle as Equilateral, Isosceles or Scalene; otherwise report that it is not a valid triangle, using the exact sentences shown below.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>3\n3\n3</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>It is an Equilateral Triangle.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>5\n5\n8</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>It is an Isosceles Triangle.</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>3\n4\n5</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>It is a Scalene Triangle.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "3\n3\n3", "expected": "It is an Equilateral Triangle.", "hidden": false, "matchType": "normalized" },
      { "input": "5\n5\n8", "expected": "It is an Isosceles Triangle.", "hidden": false, "matchType": "normalized" },
      { "input": "3\n4\n5", "expected": "It is a Scalene Triangle.", "hidden": false, "matchType": "normalized" },
      { "input": "1\n2\n5", "expected": "It is not a Valid Triangle.", "hidden": true, "matchType": "normalized" },
      { "input": "5\n5\n5", "expected": "It is an Equilateral Triangle.", "hidden": true, "matchType": "normalized" },
      { "input": "2\n3\n4", "expected": "It is a Scalene Triangle.", "hidden": true, "matchType": "normalized" },
      { "input": "4\n4\n7", "expected": "It is an Isosceles Triangle.", "hidden": true, "matchType": "normalized" },
      { "input": "1\n1\n3", "expected": "It is not a Valid Triangle.", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-age-classifier",
    "title": "79. Age Classifier",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads an age, validates it is between 0 and 120, then prints voting eligibility (18 and above) on one line and the age group on the next line: Child (0-12), Teenager (13-19), Adult (20-59) or Senior (60-120).</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>10</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>You are not eligible to vote\nChild</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>25</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>You are eligible to vote\nAdult</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>70</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>You are eligible to vote\nSenior</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "10", "expected": "You are not eligible to vote\nChild", "hidden": false, "matchType": "normalized" },
      { "input": "25", "expected": "You are eligible to vote\nAdult", "hidden": false, "matchType": "normalized" },
      { "input": "70", "expected": "You are eligible to vote\nSenior", "hidden": false, "matchType": "normalized" },
      { "input": "16", "expected": "You are not eligible to vote\nTeenager", "hidden": true, "matchType": "normalized" },
      { "input": "18", "expected": "You are eligible to vote\nTeenager", "hidden": true, "matchType": "normalized" },
      { "input": "-5", "expected": "Invalid age", "hidden": true, "matchType": "normalized" },
      { "input": "130", "expected": "Invalid age", "hidden": true, "matchType": "normalized" },
      { "input": "0", "expected": "You are not eligible to vote\nChild", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-twelve-hour-clock",
    "title": "80. Twelve Hour Clock",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads hours and minutes in 24-hour format and converts them to 12-hour AM/PM format with minutes zero-padded to two digits. Reject invalid inputs (hours above 24, minutes above 60, or any negative value), and treat 24:00 as midnight (12:00 AM).</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>14\n30</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>2:30 PM</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>9\n5</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>9:05 AM</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>0\n0</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>12:00 AM</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "14\n30", "expected": "2:30 PM", "hidden": false, "matchType": "normalized" },
      { "input": "9\n5", "expected": "9:05 AM", "hidden": false, "matchType": "normalized" },
      { "input": "0\n0", "expected": "12:00 AM", "hidden": false, "matchType": "normalized" },
      { "input": "12\n0", "expected": "12:00 PM", "hidden": true, "matchType": "normalized" },
      { "input": "24\n0", "expected": "12:00 AM", "hidden": true, "matchType": "normalized" },
      { "input": "23\n59", "expected": "11:59 PM", "hidden": true, "matchType": "normalized" },
      { "input": "25\n0", "expected": "Invalid input!", "hidden": true, "matchType": "normalized" },
      { "input": "10\n61", "expected": "Invalid input!", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-library-fine",
    "title": "81. Library Fine",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads a book type (R for regular, F for fiction) and the days overdue, then computes the fine: $0.50 per day for R, $1.00 per day for F, plus an extra $100 when overdue more than 90 days. Print the fine with two decimal places, or Invalid book type! for any other book type.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>R\n10</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>5.00</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>F\n5</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>5.00</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>X\n10</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Invalid book type!</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "R\n10", "expected": "5.00", "hidden": false, "matchType": "normalized" },
      { "input": "F\n5", "expected": "5.00", "hidden": false, "matchType": "normalized" },
      { "input": "X\n10", "expected": "Invalid book type!", "hidden": false, "matchType": "normalized" },
      { "input": "R\n100", "expected": "150.00", "hidden": true, "matchType": "normalized" },
      { "input": "F\n95", "expected": "195.00", "hidden": true, "matchType": "normalized" },
      { "input": "R\n0", "expected": "0.00", "hidden": true, "matchType": "normalized" },
      { "input": "F\n-5", "expected": "0.00", "hidden": true, "matchType": "normalized" },
      { "input": "R\n90", "expected": "45.00", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-power-of-two",
    "title": "82. Power of Two",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads a positive integer and uses the bitwise trick (n and (n-1)) to decide whether it is a power of 2. Print the result in the exact sentence format shown below.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>8</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>8 is a power of 2.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>10</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>10 is not a power of 2.</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>1</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>1 is a power of 2.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "8", "expected": "8 is a power of 2.", "hidden": false, "matchType": "normalized" },
      { "input": "10", "expected": "10 is not a power of 2.", "hidden": false, "matchType": "normalized" },
      { "input": "1", "expected": "1 is a power of 2.", "hidden": false, "matchType": "normalized" },
      { "input": "16", "expected": "16 is a power of 2.", "hidden": true, "matchType": "normalized" },
      { "input": "0", "expected": "0 is not a power of 2.", "hidden": true, "matchType": "normalized" },
      { "input": "-4", "expected": "-4 is not a power of 2.", "hidden": true, "matchType": "normalized" },
      { "input": "7", "expected": "7 is not a power of 2.", "hidden": true, "matchType": "normalized" },
      { "input": "1024", "expected": "1024 is a power of 2.", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-shopping-discount",
    "title": "83. Shopping Discount",
    "difficulty": "Medium",
    "level": 1,
    "description": "<p>Write a C program that reads a purchase amount and membership status (1 for member, anything else for non-member), then applies a discount: members get 20% on purchases of 1000 or more and 10% otherwise; non-members get 15% on 5000 or more, 5% on 1000 or more, and 0% otherwise. Print the discount line and the final bill, each with two decimal places.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>2000\n1</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>You are eligible for a 20.00% discount\nYour final bill is 1600.00</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>500\n1</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>You are eligible for a 10.00% discount\nYour final bill is 450.00</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>6000\n0</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>You are eligible for a 15.00% discount\nYour final bill is 5100.00</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "2000\n1", "expected": "You are eligible for a 20.00% discount\nYour final bill is 1600.00", "hidden": false, "matchType": "normalized" },
      { "input": "500\n1", "expected": "You are eligible for a 10.00% discount\nYour final bill is 450.00", "hidden": false, "matchType": "normalized" },
      { "input": "6000\n0", "expected": "You are eligible for a 15.00% discount\nYour final bill is 5100.00", "hidden": false, "matchType": "normalized" },
      { "input": "2000\n0", "expected": "You are eligible for a 5.00% discount\nYour final bill is 1900.00", "hidden": true, "matchType": "normalized" },
      { "input": "500\n0", "expected": "You are eligible for a 0.00% discount\nYour final bill is 500.00", "hidden": true, "matchType": "normalized" },
      { "input": "1000\n1", "expected": "You are eligible for a 20.00% discount\nYour final bill is 800.00", "hidden": true, "matchType": "normalized" },
      { "input": "1000\n0", "expected": "You are eligible for a 5.00% discount\nYour final bill is 950.00", "hidden": true, "matchType": "normalized" },
      { "input": "5000\n0", "expected": "You are eligible for a 15.00% discount\nYour final bill is 4250.00", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-salary-bonus",
    "title": "84. Salary Bonus",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads a gender character and salary, then computes a bonus of 5% for M and 10% for F, with an extra 2% when the salary is below 10000. Print the bonus and then the final salary, each with two decimal places, or Invalid gender input! for any other gender.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>M\n20000</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>1000.00\n21000.00</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>F\n20000</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>2000.00\n22000.00</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>F\n8000</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>960.00\n8960.00</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "M\n20000", "expected": "1000.00\n21000.00", "hidden": false, "matchType": "normalized" },
      { "input": "F\n20000", "expected": "2000.00\n22000.00", "hidden": false, "matchType": "normalized" },
      { "input": "F\n8000", "expected": "960.00\n8960.00", "hidden": false, "matchType": "normalized" },
      { "input": "X\n20000", "expected": "Invalid gender input!", "hidden": true, "matchType": "normalized" },
      { "input": "M\n8000", "expected": "560.00\n8560.00", "hidden": true, "matchType": "normalized" },
      { "input": "M\n10000", "expected": "500.00\n10500.00", "hidden": true, "matchType": "normalized" },
      { "input": "F\n9999", "expected": "1199.88\n11198.88", "hidden": true, "matchType": "normalized" },
      { "input": "M\n5000", "expected": "350.00\n5350.00", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-slab-cost",
    "title": "85. Slab Cost",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads a number of days and computes the total amount using cost-per-day slabs: $2/day up to 5 days, $3/day up to 10 days, $4/day up to 15 days, and $5/day beyond that. Print the result in the exact sentence format shown below.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>3</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Total amount to pay is 6</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>7</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Total amount to pay is 21</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>12</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Total amount to pay is 48</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "3", "expected": "Total amount to pay is 6", "hidden": false, "matchType": "normalized" },
      { "input": "7", "expected": "Total amount to pay is 21", "hidden": false, "matchType": "normalized" },
      { "input": "12", "expected": "Total amount to pay is 48", "hidden": false, "matchType": "normalized" },
      { "input": "20", "expected": "Total amount to pay is 100", "hidden": true, "matchType": "normalized" },
      { "input": "5", "expected": "Total amount to pay is 10", "hidden": true, "matchType": "normalized" },
      { "input": "10", "expected": "Total amount to pay is 30", "hidden": true, "matchType": "normalized" },
      { "input": "15", "expected": "Total amount to pay is 60", "hidden": true, "matchType": "normalized" },
      { "input": "16", "expected": "Total amount to pay is 80", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-scholarship-eligibility",
    "title": "86. Scholarship Eligibility",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads a GPA (0-5), the extracurricular activity count and the technical activity count, rejecting any negative or out-of-range values. A student is eligible for the scholarship with a GPA of at least 3.5, at least 3 extracurriculars and at least 2 technical activities. Print the exact congratulatory or rejection sentence shown below.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>4.0\n4\n3</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Congratulations! You are eligible for the scholarship.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>3.0\n4\n3</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Sorry, you are not eligible for the scholarship.</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>6.0\n4\n3</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Invalid!</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "4.0\n4\n3", "expected": "Congratulations! You are eligible for the scholarship.", "hidden": false, "matchType": "normalized" },
      { "input": "3.0\n4\n3", "expected": "Sorry, you are not eligible for the scholarship.", "hidden": false, "matchType": "normalized" },
      { "input": "6.0\n4\n3", "expected": "Invalid!", "hidden": false, "matchType": "normalized" },
      { "input": "3.8\n2\n3", "expected": "Sorry, you are not eligible for the scholarship.", "hidden": true, "matchType": "normalized" },
      { "input": "3.5\n3\n2", "expected": "Congratulations! You are eligible for the scholarship.", "hidden": true, "matchType": "normalized" },
      { "input": "4.5\n-1\n2", "expected": "Invalid!", "hidden": true, "matchType": "normalized" },
      { "input": "2.0\n5\n5", "expected": "Sorry, you are not eligible for the scholarship.", "hidden": true, "matchType": "normalized" },
      { "input": "5.0\n3\n2", "expected": "Congratulations! You are eligible for the scholarship.", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-number-words",
    "title": "87. Number Words",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Write a C program that reads an integer and classifies it: negative numbers are reported directly, digits 0-9 are printed as English words using switch-case, numbers from 10 to 100 get a range message, and anything else is invalid input. Use the exact messages shown below.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>5</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>five</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>-3</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>number is negative</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>42</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>number is between 10 and 100</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "5", "expected": "five", "hidden": false, "matchType": "normalized" },
      { "input": "-3", "expected": "number is negative", "hidden": false, "matchType": "normalized" },
      { "input": "42", "expected": "number is between 10 and 100", "hidden": false, "matchType": "normalized" },
      { "input": "0", "expected": "zero", "hidden": true, "matchType": "normalized" },
      { "input": "9", "expected": "nine", "hidden": true, "matchType": "normalized" },
      { "input": "10", "expected": "number is between 10 and 100", "hidden": true, "matchType": "normalized" },
      { "input": "100", "expected": "number is between 10 and 100", "hidden": true, "matchType": "normalized" },
      { "input": "101", "expected": "invalid input!", "hidden": true, "matchType": "normalized" }
    ]
  },
{
    "id": "l1-square-rectangle-area",
    "title": "88. Square or Rectangle",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read two side lengths. If both sides are equal, the shape is a square; otherwise it is a rectangle. Print the shape name on the first line and the area with two decimal places on the second line.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>5\n5</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Square\n25.00</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>5\n3</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Rectangle\n15.00</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>4.5\n4.5</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Square\n20.25</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "5\n5", "expected": "Square\n25.00", "hidden": false, "matchType": "normalized" },
      { "input": "5\n3", "expected": "Rectangle\n15.00", "hidden": false, "matchType": "normalized" },
      { "input": "4.5\n4.5", "expected": "Square\n20.25", "hidden": false, "matchType": "normalized" },
      { "input": "2.5\n7", "expected": "Rectangle\n17.50", "hidden": true, "matchType": "normalized" },
      { "input": "10\n10", "expected": "Square\n100.00", "hidden": true, "matchType": "normalized" },
      { "input": "3.25\n3.25", "expected": "Square\n10.56", "hidden": true, "matchType": "normalized" },
      { "input": "0.5\n0.5", "expected": "Square\n0.25", "hidden": true, "matchType": "normalized" },
      { "input": "9\n2.75", "expected": "Rectangle\n24.75", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-cm-to-feet",
    "title": "89. CM to Feet",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read a length in centimetres. If the value is negative, print \"Length cannot be negative.\" Otherwise convert it to feet using the factor 0.0328084. Print the result in the format \"X.XX centimetres is Y.YY feet.\"</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>100</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>100.00 centimetres is 3.28 feet.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>-5</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Length cannot be negative.</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>0</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>0.00 centimetres is 0.00 feet.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "100", "expected": "100.00 centimetres is 3.28 feet.", "hidden": false, "matchType": "normalized" },
      { "input": "-5", "expected": "Length cannot be negative.", "hidden": false, "matchType": "normalized" },
      { "input": "0", "expected": "0.00 centimetres is 0.00 feet.", "hidden": false, "matchType": "normalized" },
      { "input": "30.48", "expected": "30.48 centimetres is 1.00 feet.", "hidden": true, "matchType": "normalized" },
      { "input": "250", "expected": "250.00 centimetres is 8.20 feet.", "hidden": true, "matchType": "normalized" },
      { "input": "-0.5", "expected": "Length cannot be negative.", "hidden": true, "matchType": "normalized" },
      { "input": "1", "expected": "1.00 centimetres is 0.03 feet.", "hidden": true, "matchType": "normalized" },
      { "input": "1000", "expected": "1000.00 centimetres is 32.81 feet.", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-age-classification",
    "title": "90. Age Classification",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read an age. Classify it as Cub (0-2), Juvenile (3-4), Subadult (5-6), Young adult (7-10) or Old adult (11-26). Print \"Invalid\" for any age outside 0 to 26.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>2</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Cub</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>7</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Young adult</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>30</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Invalid</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "2", "expected": "Cub", "hidden": false, "matchType": "normalized" },
      { "input": "7", "expected": "Young adult", "hidden": false, "matchType": "normalized" },
      { "input": "30", "expected": "Invalid", "hidden": false, "matchType": "normalized" },
      { "input": "0", "expected": "Cub", "hidden": true, "matchType": "normalized" },
      { "input": "4", "expected": "Juvenile", "hidden": true, "matchType": "normalized" },
      { "input": "6", "expected": "Subadult", "hidden": true, "matchType": "normalized" },
      { "input": "15", "expected": "Old adult", "hidden": true, "matchType": "normalized" },
      { "input": "-3", "expected": "Invalid", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-income-tax",
    "title": "91. Income Tax",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read an income amount. Calculate tax as 5% for income up to 10000, 10% for income up to 50000, and 20% above that. Print the tax as a dollar amount with two decimal places.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>8000</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>$400.00</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>30000</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>$3000.00</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>100000</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>$20000.00</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "8000", "expected": "$400.00", "hidden": false, "matchType": "normalized" },
      { "input": "30000", "expected": "$3000.00", "hidden": false, "matchType": "normalized" },
      { "input": "100000", "expected": "$20000.00", "hidden": false, "matchType": "normalized" },
      { "input": "10000", "expected": "$500.00", "hidden": true, "matchType": "normalized" },
      { "input": "50000", "expected": "$5000.00", "hidden": true, "matchType": "normalized" },
      { "input": "50001", "expected": "$10000.20", "hidden": true, "matchType": "normalized" },
      { "input": "0", "expected": "$0.00", "hidden": true, "matchType": "normalized" },
      { "input": "9999.99", "expected": "$500.00", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-wage-calculator",
    "title": "92. Wage Calculator",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read an age, a gender character (M or F) and the number of working days, each on its own line. Workers aged 18-29 earn 700 (M) or 750 (F) per day; workers aged 30-40 earn 800 (M) or 850 (F) per day. Print \"Invalid\" for any other age or gender, otherwise print the total wage.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>25\nM\n20</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>14000</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>35\nF\n10</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>8500</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>17\nM\n5</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Invalid</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "25\nM\n20", "expected": "14000", "hidden": false, "matchType": "normalized" },
      { "input": "35\nF\n10", "expected": "8500", "hidden": false, "matchType": "normalized" },
      { "input": "17\nM\n5", "expected": "Invalid", "hidden": false, "matchType": "normalized" },
      { "input": "18\nF\n30", "expected": "22500", "hidden": true, "matchType": "normalized" },
      { "input": "30\nM\n7", "expected": "5600", "hidden": true, "matchType": "normalized" },
      { "input": "40\nF\n1", "expected": "850", "hidden": true, "matchType": "normalized" },
      { "input": "29\nX\n10", "expected": "Invalid", "hidden": true, "matchType": "normalized" },
      { "input": "41\nM\n10", "expected": "Invalid", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-revenue-deduction",
    "title": "93. Revenue After Deduction",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read the unit price, quantity and a middleman category character (A, B or C), each on its own line. Apply a deduction of 10% for A, 20% for B and 30% for C to the total revenue. For any other category print \"Invalid middleman\" and use the total without deduction. Print the final revenue with two decimal places.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>100\n5\nA</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>450.00</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>50\n4\nB</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>160.00</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>25\n2\nZ</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Invalid middleman\n50.00</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "100\n5\nA", "expected": "450.00", "hidden": false, "matchType": "normalized" },
      { "input": "50\n4\nB", "expected": "160.00", "hidden": false, "matchType": "normalized" },
      { "input": "25\n2\nZ", "expected": "Invalid middleman\n50.00", "hidden": false, "matchType": "normalized" },
      { "input": "10\n10\nC", "expected": "70.00", "hidden": true, "matchType": "normalized" },
      { "input": "99.99\n3\nA", "expected": "269.97", "hidden": true, "matchType": "normalized" },
      { "input": "20\n1\nB", "expected": "16.00", "hidden": true, "matchType": "normalized" },
      { "input": "5.5\n6\nC", "expected": "23.10", "hidden": true, "matchType": "normalized" },
      { "input": "7\n2\nD", "expected": "Invalid middleman\n14.00", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-day-of-week",
    "title": "94. Day of Week",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read a day number from 1 to 7. Print the day name, followed by \"Week day\" for Monday to Friday or \"Holiday\" for Saturday and Sunday. Print \"Invalid Input\" for any other number.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>1</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Monday\nWeek day</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>6</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Saturday\nHoliday</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>9</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Invalid Input</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "1", "expected": "Monday\nWeek day", "hidden": false, "matchType": "normalized" },
      { "input": "6", "expected": "Saturday\nHoliday", "hidden": false, "matchType": "normalized" },
      { "input": "9", "expected": "Invalid Input", "hidden": false, "matchType": "normalized" },
      { "input": "3", "expected": "Wednesday\nWeek day", "hidden": true, "matchType": "normalized" },
      { "input": "5", "expected": "Friday\nWeek day", "hidden": true, "matchType": "normalized" },
      { "input": "7", "expected": "Sunday\nHoliday", "hidden": true, "matchType": "normalized" },
      { "input": "0", "expected": "Invalid Input", "hidden": true, "matchType": "normalized" },
      { "input": "2", "expected": "Tuesday\nWeek day", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-cola-vending-machine",
    "title": "95. Cola Vending Machine",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>A cola costs 2 and the machine holds 5 colas. Read the desired quantity: print \"Invalid quantity\" if it is 1 or less, or \"Full quantity not available\" if it exceeds 5. Otherwise read the payment and print \"Dispensing\" for exact payment, \"Insufficient payment\" for less, or \"Over payment\" for more.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>3\n6.00</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Dispensing</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>2\n3.00</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Insufficient payment</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>1</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Invalid quantity</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "3\n6.00", "expected": "Dispensing", "hidden": false, "matchType": "normalized" },
      { "input": "2\n3.00", "expected": "Insufficient payment", "hidden": false, "matchType": "normalized" },
      { "input": "1", "expected": "Invalid quantity", "hidden": false, "matchType": "normalized" },
      { "input": "4\n10.00", "expected": "Over payment", "hidden": true, "matchType": "normalized" },
      { "input": "5\n10.00", "expected": "Dispensing", "hidden": true, "matchType": "normalized" },
      { "input": "6", "expected": "Full quantity not available", "hidden": true, "matchType": "normalized" },
      { "input": "0", "expected": "Invalid quantity", "hidden": true, "matchType": "normalized" },
      { "input": "2\n4.00", "expected": "Dispensing", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-switch-calculator",
    "title": "96. Switch Calculator",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read an operation code (1-4) and two integers, each on its own line. Operation 1 computes num1 % num2, 2 computes num1 raised to num2, 3 multiplies, and 4 performs integer division. Print \"Division by zero!\" when dividing or taking modulo by zero, and \"Invalid operation!\" for any other code.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>1\n10\n3</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>1</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>3\n7\n6</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>42</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>4\n10\n0</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Division by zero!</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "1\n10\n3", "expected": "1", "hidden": false, "matchType": "normalized" },
      { "input": "3\n7\n6", "expected": "42", "hidden": false, "matchType": "normalized" },
      { "input": "4\n10\n0", "expected": "Division by zero!", "hidden": false, "matchType": "normalized" },
      { "input": "2\n2\n10", "expected": "1024", "hidden": true, "matchType": "normalized" },
      { "input": "1\n7\n0", "expected": "Division by zero!", "hidden": true, "matchType": "normalized" },
      { "input": "4\n20\n4", "expected": "5", "hidden": true, "matchType": "normalized" },
      { "input": "9\n1\n1", "expected": "Invalid operation!", "hidden": true, "matchType": "normalized" },
      { "input": "2\n3\n3", "expected": "27", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-savings-calculator-float",
    "title": "97. Savings Calculator",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read the total income and allowances. The saving amount is income minus allowances, and the saving percentage is the saving amount divided by income times 100. Print both values with two decimal places in the shown format.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>5000\n2000</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Saving Amount: 3000.00\nSaving Percentage: 60.00%</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>10000\n2500</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Saving Amount: 7500.00\nSaving Percentage: 75.00%</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>800\n800</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Saving Amount: 0.00\nSaving Percentage: 0.00%</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "5000\n2000", "expected": "Saving Amount: 3000.00\nSaving Percentage: 60.00%", "hidden": false, "matchType": "normalized" },
      { "input": "10000\n2500", "expected": "Saving Amount: 7500.00\nSaving Percentage: 75.00%", "hidden": false, "matchType": "normalized" },
      { "input": "800\n800", "expected": "Saving Amount: 0.00\nSaving Percentage: 0.00%", "hidden": false, "matchType": "normalized" },
      { "input": "1200\n300", "expected": "Saving Amount: 900.00\nSaving Percentage: 75.00%", "hidden": true, "matchType": "normalized" },
      { "input": "3333\n1111", "expected": "Saving Amount: 2222.00\nSaving Percentage: 66.67%", "hidden": true, "matchType": "normalized" },
      { "input": "100\n33", "expected": "Saving Amount: 67.00\nSaving Percentage: 67.00%", "hidden": true, "matchType": "normalized" },
      { "input": "500\n125", "expected": "Saving Amount: 375.00\nSaving Percentage: 75.00%", "hidden": true, "matchType": "normalized" },
      { "input": "2500\n625", "expected": "Saving Amount: 1875.00\nSaving Percentage: 75.00%", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-buzz-number",
    "title": "98. Buzz Number",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read a non-negative integer. A buzz number is divisible by 9 or ends with the digit 9. Print whether the number is a buzz number in the shown format.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>27</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>27 is a buzz number.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>19</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>19 is a buzz number.</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>25</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>25 is not a buzz number.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "27", "expected": "27 is a buzz number.", "hidden": false, "matchType": "normalized" },
      { "input": "19", "expected": "19 is a buzz number.", "hidden": false, "matchType": "normalized" },
      { "input": "25", "expected": "25 is not a buzz number.", "hidden": false, "matchType": "normalized" },
      { "input": "9", "expected": "9 is a buzz number.", "hidden": true, "matchType": "normalized" },
      { "input": "81", "expected": "81 is a buzz number.", "hidden": true, "matchType": "normalized" },
      { "input": "29", "expected": "29 is a buzz number.", "hidden": true, "matchType": "normalized" },
      { "input": "10", "expected": "10 is not a buzz number.", "hidden": true, "matchType": "normalized" },
      { "input": "0", "expected": "0 is a buzz number.", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-minimum-changes",
    "title": "99. Minimum Changes",
    "difficulty": "Medium",
    "level": 1,
    "description": "<p>Read five integers. Determine the minimum number of changes needed to make all five equal: 0 if all are equal, 1 if any four are equal, 2 if any three are equal, 3 if any two are equal, and 4 if all are distinct. Print the number of changes.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>5 5 5 5 5</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>0</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>5 5 5 5 3</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>1</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>1 2 3 4 5</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>4</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "5 5 5 5 5", "expected": "0", "hidden": false, "matchType": "normalized" },
      { "input": "5 5 5 5 3", "expected": "1", "hidden": false, "matchType": "normalized" },
      { "input": "1 2 3 4 5", "expected": "4", "hidden": false, "matchType": "normalized" },
      { "input": "5 5 5 3 3", "expected": "2", "hidden": true, "matchType": "normalized" },
      { "input": "5 5 3 3 2", "expected": "3", "hidden": true, "matchType": "normalized" },
      { "input": "7 7 7 3 5", "expected": "2", "hidden": true, "matchType": "normalized" },
      { "input": "4 4 5 6 7", "expected": "3", "hidden": true, "matchType": "normalized" },
      { "input": "9 9 9 9 8", "expected": "1", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-job-eligibility",
    "title": "100. Job Eligibility",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read an age and years of experience, each on its own line. Candidates must be aged 13 to 18. With 1-3 years of experience print \"Junior\", with more than 3 print \"Intermediate\", otherwise print \"You are not eligible\".</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>15\n2</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Junior</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>16\n5</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Intermediate</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>12\n2</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>You are not eligible</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "15\n2", "expected": "Junior", "hidden": false, "matchType": "normalized" },
      { "input": "16\n5", "expected": "Intermediate", "hidden": false, "matchType": "normalized" },
      { "input": "12\n2", "expected": "You are not eligible", "hidden": false, "matchType": "normalized" },
      { "input": "13\n1", "expected": "Junior", "hidden": true, "matchType": "normalized" },
      { "input": "18\n3", "expected": "Junior", "hidden": true, "matchType": "normalized" },
      { "input": "14\n0", "expected": "You are not eligible", "hidden": true, "matchType": "normalized" },
      { "input": "20\n5", "expected": "You are not eligible", "hidden": true, "matchType": "normalized" },
      { "input": "17\n10", "expected": "Intermediate", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-profit-or-loss",
    "title": "101. Profit or Loss",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read the initial investment, purchase price and current value, each on its own line. Compute profit/loss as ((current - purchase) x initial) / 100. Print \"Profit\" or \"Loss\" followed by the absolute amount with two decimals, or \"No change\" when it is zero.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>1000\n50\n60</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Profit\n100.00</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>1000\n60\n50</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Loss\n100.00</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>500\n40\n40</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>No change</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "1000\n50\n60", "expected": "Profit\n100.00", "hidden": false, "matchType": "normalized" },
      { "input": "1000\n60\n50", "expected": "Loss\n100.00", "hidden": false, "matchType": "normalized" },
      { "input": "500\n40\n40", "expected": "No change", "hidden": false, "matchType": "normalized" },
      { "input": "200\n10\n15", "expected": "Profit\n10.00", "hidden": true, "matchType": "normalized" },
      { "input": "200\n15\n10", "expected": "Loss\n10.00", "hidden": true, "matchType": "normalized" },
      { "input": "1500\n100\n90", "expected": "Loss\n150.00", "hidden": true, "matchType": "normalized" },
      { "input": "100\n25\n30", "expected": "Profit\n5.00", "hidden": true, "matchType": "normalized" },
      { "input": "750\n80\n80", "expected": "No change", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-positive-negative-analyzer",
    "title": "102. Positive Negative Analyzer",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read an integer. If it is greater than 1, print \"P\" and its cube; if it is 0, print \"0\"; otherwise print \"N\" and its square. Each value goes on its own line.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>3</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>P\n27</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>0</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>0</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>-4</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>N\n16</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "3", "expected": "P\n27", "hidden": false, "matchType": "normalized" },
      { "input": "0", "expected": "0", "hidden": false, "matchType": "normalized" },
      { "input": "-4", "expected": "N\n16", "hidden": false, "matchType": "normalized" },
      { "input": "1", "expected": "N\n1", "hidden": true, "matchType": "normalized" },
      { "input": "5", "expected": "P\n125", "hidden": true, "matchType": "normalized" },
      { "input": "-3", "expected": "N\n9", "hidden": true, "matchType": "normalized" },
      { "input": "2", "expected": "P\n8", "hidden": true, "matchType": "normalized" },
      { "input": "-1", "expected": "N\n1", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-linear-equation-solver",
    "title": "103. Linear Equation Solver",
    "difficulty": "Medium",
    "level": 1,
    "description": "<p>Read integers a and b for the equation ax + b = 0, each on its own line. Print \"Infinite Solutions\" if both are zero, \"No Solution\" if only a is zero, otherwise print x = -b/a with two decimal places.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>2\n4</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>-2.00</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>0\n0</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Infinite Solutions</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>0\n5</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>No Solution</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "2\n4", "expected": "-2.00", "hidden": false, "matchType": "normalized" },
      { "input": "0\n0", "expected": "Infinite Solutions", "hidden": false, "matchType": "normalized" },
      { "input": "0\n5", "expected": "No Solution", "hidden": false, "matchType": "normalized" },
      { "input": "1\n-3", "expected": "3.00", "hidden": true, "matchType": "normalized" },
      { "input": "4\n2", "expected": "-0.50", "hidden": true, "matchType": "normalized" },
      { "input": "3\n1", "expected": "-0.33", "hidden": true, "matchType": "normalized" },
      { "input": "6\n4", "expected": "-0.67", "hidden": true, "matchType": "normalized" },
      { "input": "5\n0", "expected": "0.00", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-product-sign",
    "title": "104. Product Sign",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read three integers. Compute their product and print whether it is positive, negative or zero in the shown format.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>2 3 4</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>Product is positive.</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>-2 3 4</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>Product is negative.</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>0 5 7</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>Product is zero.</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "2 3 4", "expected": "Product is positive.", "hidden": false, "matchType": "normalized" },
      { "input": "-2 3 4", "expected": "Product is negative.", "hidden": false, "matchType": "normalized" },
      { "input": "0 5 7", "expected": "Product is zero.", "hidden": false, "matchType": "normalized" },
      { "input": "1 1 1", "expected": "Product is positive.", "hidden": true, "matchType": "normalized" },
      { "input": "-1 -2 -3", "expected": "Product is negative.", "hidden": true, "matchType": "normalized" },
      { "input": "5 -5 2", "expected": "Product is negative.", "hidden": true, "matchType": "normalized" },
      { "input": "-4 -4 4", "expected": "Product is positive.", "hidden": true, "matchType": "normalized" },
      { "input": "10 0 -3", "expected": "Product is zero.", "hidden": true, "matchType": "normalized" }
    ]
  },
  {
    "id": "l1-average-grade-calculator",
    "title": "105. Grade Calculator",
    "difficulty": "Easy",
    "level": 1,
    "description": "<p>Read five subject scores. Compute the average and print it with two decimals followed by a space and the grade on the same line: A for 81 and above, B for 71 and above, C for 66 and above, D for 61 and above, otherwise F.</p>\n      <br/>\n      <p><strong>Sample Input 1:</strong></p>\n      <pre>80 80 80 80 80</pre>\n      <p><strong>Sample Output 1:</strong></p>\n      <pre>80.00 B</pre>\n      <br/>\n      <p><strong>Sample Input 2:</strong></p>\n      <pre>90 85 92 88 95</pre>\n      <p><strong>Sample Output 2:</strong></p>\n      <pre>90.00 A</pre>\n      <br/>\n      <p><strong>Sample Input 3:</strong></p>\n      <pre>50 55 45 60 52</pre>\n      <p><strong>Sample Output 3:</strong></p>\n      <pre>52.40 F</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      { "input": "80 80 80 80 80", "expected": "80.00 B", "hidden": false, "matchType": "normalized" },
      { "input": "90 85 92 88 95", "expected": "90.00 A", "hidden": false, "matchType": "normalized" },
      { "input": "50 55 45 60 52", "expected": "52.40 F", "hidden": false, "matchType": "normalized" },
      { "input": "81 81 81 81 81", "expected": "81.00 A", "hidden": true, "matchType": "normalized" },
      { "input": "71 71 71 71 71", "expected": "71.00 B", "hidden": true, "matchType": "normalized" },
      { "input": "66 66 66 66 66", "expected": "66.00 C", "hidden": true, "matchType": "normalized" },
      { "input": "61 61 61 61 61", "expected": "61.00 D", "hidden": true, "matchType": "normalized" },
      { "input": "70 70 70 70 70", "expected": "70.00 C", "hidden": true, "matchType": "normalized" }
    ]
  },
];

export const LEVELS: number[] = Array.from(new Set(problems.map(p => Number(p.level)))).sort((a, b) => a - b);

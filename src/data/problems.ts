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
        "input": "105",
        "expected": "Invalid charge level",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "-5",
        "expected": "Invalid charge level",
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
        "input": "1\n5",
        "expected": "1",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "3\n4",
        "expected": "81",
        "hidden": false,
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
        "input": "45",
        "expected": "Invalid input\n",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "0",
        "expected": "Invalid input\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "10",
        "expected": "X\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "20",
        "expected": "XX\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "39",
        "expected": "XXXIX\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "14",
        "expected": "XIV\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "24",
        "expected": "XXIV\n",
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
      },
      {
        "input": "20 30",
        "expected": "23 29 \n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "50 60",
        "expected": "53 59 \n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "90 100",
        "expected": "97 \n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2 5",
        "expected": "2 3 5 \n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "2 2",
        "expected": "2 \n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "10 10",
        "expected": "\n",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "1 100",
        "expected": "2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97 \n",
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
      },
      {
        "input": "10000",
        "expected": "Perfect Square\n",
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
        "input": "27",
        "expected": "Invalid input\n",
        "hidden": false,
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
      },
      {
        "input": "10",
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
      },
      {
        "input": "99",
        "expected": "0",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "9090",
        "expected": "101",
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
      },
      {
        "input": "5 3",
        "expected": "615\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "9 2",
        "expected": "108\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "2 6",
        "expected": "246912\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "7 1",
        "expected": "7\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "0 5",
        "expected": "0\n",
        "hidden": true,
        "matchType": "numeric"
      },
      {
        "input": "1 0",
        "expected": "0\n",
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
      },
      {
        "input": "10",
        "expected": "Not Armstrong Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "500",
        "expected": "Not Armstrong Number",
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
      },
      {
        "input": "100",
        "expected": "Binary: 1100100",
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
      },
      {
        "input": "101",
        "expected": "Not Harshad Number",
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
      },
      {
        "input": "625",
        "expected": "Automorphic Number",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "89",
        "expected": "Not Automorphic Number",
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
      },
      {
        "input": "19",
        "expected": "Not Twisted Prime",
        "hidden": true,
        "matchType": "normalized"
      },
      {
        "input": "31",
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
      }
    ]
  },
  {
    "id": "l3-p19-add-peak-num",
    "title": "19. Add Peak Num and Its Neighbour",
    "difficulty": "Hard",
    "level": 3,
    "description": "Find peak elements (strictly greater than neighbours). Replace a peak element with the sum of itself and its neighbours. Handle edges: if first element is > second, sum them. Output the modified array.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>7\n1 2 3 4 5 3 1</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>1 6 2 4 12 3 1</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>4\n2 1 3 2</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>3 1 6 2</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "7\n1 2 3 4 5 3 1",
        "expected": "1 6 2 4 12 3 1",
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
      }
    ]
  },
  {
    "id": "l3-p47-min-max-temp",
    "title": "47. Min and Max Temperature",
    "difficulty": "Easy",
    "level": 3,
    "description": "Print min and max temperature. If any temperature is negative, print 'Invalid temperature\\n' and terminate. Output: 'Min = %d\\nMax = %d\\n'.\n<br/>\n<p><strong>Sample Input 1:</strong></p>\n<pre>4\n5 6 70 2</pre>\n<p><strong>Sample Output 1:</strong></p>\n<pre>Min = 2\nMax = 70</pre>\n<br/>\n<p><strong>Sample Input 2:</strong></p>\n<pre>4\n-9 0 8 7</pre>\n<p><strong>Sample Output 2:</strong></p>\n<pre>Invalid temperature</pre>",
    "functionName": "main",
    "starterCode": "#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}",
    "testCases": [
      {
        "input": "4\n5 6 70 2",
        "expected": "Min = 2\nMax = 70",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "4\n-9 0 8 7",
        "expected": "Invalid temperature",
        "hidden": false,
        "matchType": "normalized"
      },
      {
        "input": "3\n10 10 10",
        "expected": "Min = 10\nMax = 10",
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
      }
    ]
  }
];

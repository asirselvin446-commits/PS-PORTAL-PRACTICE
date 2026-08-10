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
    "title": "Attendance percentage of a student",
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
    "title": "Employee Gross Salary Calculation",
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
    "title": "The Fitness Challenge",
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
    "title": "Power calculation",
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
    "title": "Salary Prediction",
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
    "title": "Vehicle Registration Information System",
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
    "title": "Tax Calculation",
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
    "title": "5 digit number checking",
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
    "title": "The Product Calculator",
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
    "title": "1. Prime number with ranges",
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
    "title": "2. Collatz sequence",
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
    "title": "4. Harshad Number",
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
    "title": "5. Product of a digit",
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
    "title": "10. Strong number",
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
    "title": "12. Palindrome or not",
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
    "title": "13. Armstrong number",
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
    "title": "16. Twin Primes",
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
    "title": "3. Working with character",
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
    "title": "6. Pattern",
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
    "title": "14. Sum of a digit",
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
    "title": "Fibonacci Series",
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
  }
];

const encodeBase64 = (str) => btoa(str);
const code = `#include <stdio.h>\n#include <math.h>\nint main() {\n    int n;\n    if (scanf("%d", &n) != 1) return 0;\n    int original = n, num = n, digits = 0;\n    while (num > 0) {\n        digits++;\n        num /= 10;\n    }\n    num = original;\n    double sum = 0;\n    while (num > 0) {\n        int rem = num % 10;\n        sum += pow(rem, digits);\n        num /= 10;\n    }\n    if ((int)sum == original) {\n        printf("%d is a armstrong number\\n", original);\n    } else {\n        printf("%d is not a armstrong number\\n", original);\n    }\n    return 0;\n}`;

async function test() {
  const fetch = (await import('node-fetch')).default;
  const response = await fetch('https://ce.judge0.com/submissions?base64_encoded=true&wait=true', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      language_id: 50,
      compiler_options: '-lm',
      source_code: encodeBase64(code),
      stdin: encodeBase64('153'),
    }),
  });
  const data = await response.json();
  console.log(data);
}
test();

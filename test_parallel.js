async function test() {
  const tcs = Array.from({length: 6}, (_, i) => String(i));
  const code = '#include <stdio.h>\nint main() { int n; scanf("%d", &n); printf("%d", n); return 0; }';
  
  const start = Date.now();
  const promises = tcs.map(tc => 
    fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ compiler: 'gcc-head', code, stdin: tc })
    }).then(r => r.json())
  );
  
  const results = await Promise.all(promises);
  console.log('Time:', Date.now() - start, 'ms');
  console.log(results.map(r => r.status));
}
test();

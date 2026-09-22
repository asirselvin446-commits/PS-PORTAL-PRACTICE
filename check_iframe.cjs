const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  await page.setContent(`
    <html>
      <body>
        <iframe src="http://localhost:3000" width="800" height="600"></iframe>
      </body>
    </html>
  `);
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await new Promise(r => setTimeout(r, 5000));
  await browser.close();
})();

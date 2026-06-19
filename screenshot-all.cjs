const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2500);

  await page.screenshot({ path: 'shadcn-hero.png' });

  await page.evaluate(() => document.querySelector('#educacion').scrollIntoView());
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'shadcn-edu.png' });

  await page.evaluate(() => document.querySelector('#cuentas').scrollIntoView());
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'shadcn-cuentas.png' });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 600));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'shadcn-software.png' });

  await browser.close();
  console.log('shadcn screenshots done!');
})();

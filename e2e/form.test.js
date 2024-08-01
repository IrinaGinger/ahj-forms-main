import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(50000);

describe('form with popovers', () => {
  let browser = null;
  let page = null;
  let server = null;
  
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });
    
    browser = await puppeteer.launch({
      headless: false, // show gui
      slowMo: 100,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  test('popover should be shown', async () => {
    await page.goto(baseUrl);

    await page.waitForSelector('.form');

    const form = await page.$('.form');
    const button = await form.$('.btn');

    await button.click();

    await page.waitForSelector('.popover-element');
    console.log("popover has shown");
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });
});
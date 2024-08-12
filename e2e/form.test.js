import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000);

describe('form with popovers', () => {
  let browser = null;
  let page = null;
  let server = null;
  
  const baseUrl = 'http://localhost:8087';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      if(server.connected) {
        process.send('ok');
        resolve();
      } else {
        reject();
      }
    });
    
    browser = await puppeteer.launch({
      // headless: false, // show gui
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  test('first click - popover should be shown', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.form');
    const button = await form.$('.btn');

    await button.click();

    expect(await page.waitForSelector(".popover-element")).toBeTruthy();
  });

  test('second click - popover should be hidden', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.form');
    const button = await form.$('.btn');

    await button.click();
    await button.click();

    expect(await page.$(".popover-element")).toBeNull();
  });

  test("popovers's text checking", async () => {
    await page.goto(baseUrl);
    const form = await page.$('.form');
    const button = await form.$('.btn');

    await button.click();
    expect(await page.$eval(".popover-content", (elem) => elem.textContent)).toBe("And here's some amazing content. It's very engaging. Right?");
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });
});
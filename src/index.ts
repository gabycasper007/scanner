import getTickers from './tickers';
import { Browser } from 'puppeteer';

const puppeteer = require('puppeteer');

async function main() {
  try {
    const browser: Browser = await puppeteer.launch({
      headless: false, // this is useful when you want to see what's happening in the browser
      slowMo: 40, // this is useful when you want to see what's happening in the browser
      defaultViewport: null,
    });

    const tickers = await getTickers(browser);
    console.log(`tickers`, tickers);

    await browser.close();
  } catch (err) {
    console.log(err);
  }
}

main();

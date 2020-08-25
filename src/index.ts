import getTickers from './tickers';
import { Browser } from 'puppeteer';
import getFinancialRatiosForTicker from './data';

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

    const ratios = await getFinancialRatiosForTicker(browser, 'VRTX');
    console.table(ratios);

    await browser.close();
  } catch (err) {
    console.log(err);
  }
}

main();

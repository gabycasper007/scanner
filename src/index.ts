import getTickers from './tickers';
import { Browser } from 'puppeteer';
import getFinancialRatiosForTicker from './data';

const puppeteer = require('puppeteer');

async function main() {
  try {
    const browser: Browser = await puppeteer.launch({
      headless: false,
      slowMo: 40,
      defaultViewport: null,
    });

    const tickers = await getTickers(browser);
    console.table(tickers);

    const ratios = await getFinancialRatiosForTicker(browser, 'VRTX');
    console.table(ratios);

    await browser.close();
  } catch (err) {
    console.log(err);
  }
}

main();

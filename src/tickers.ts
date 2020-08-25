import { Browser } from 'puppeteer';
import { SCREENER_SCREEN } from './constants';

const TICKERS_SELECTOR = '.screener-link-primary';
const NEXT_PAGE_SELECTOR = '.tab-link:last-of-type b';

const getTickers = async (browser: Browser) => {
  const page = await browser.newPage();

  await page.goto(SCREENER_SCREEN, {
    waitUntil: 'networkidle0',
  });

  let tickers: string[] = [];
  let hasNextPage = false;
  do {
    tickers = tickers.concat(
      await page.$$eval(TICKERS_SELECTOR, elements =>
        elements.map(item => item.textContent)
      )
    );

    const nextPageText = await page.$eval(
      NEXT_PAGE_SELECTOR,
      element => element.textContent
    );

    hasNextPage = nextPageText === 'next';

    if (hasNextPage) {
      await Promise.all([
        page.waitForNavigation(),
        page.click(NEXT_PAGE_SELECTOR),
      ]);
    }
  } while (hasNextPage);

  await page.close();
  return tickers;
};

export default getTickers;

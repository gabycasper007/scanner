import { Browser } from 'puppeteer';

const BASE_URL =
  'https://www.finviz.com/screener.ashx?v=121&f=fa_debteq_u1,fa_epsyoy_o30,fa_ltdebteq_u1,fa_netmargin_o5,fa_roe_o10,fa_salesqoq_o20&ft=2&o=-epsyoy';
const TICKERS_SELECTOR = '.screener-link-primary';
const NEXT_PAGE_SELECTOR = '.tab-link:last-of-type b';

const getTickers = async (browser: Browser) => {
  const page = await browser.newPage();

  await page.goto(BASE_URL, {
    waitUntil: 'networkidle0',
  });

  let tickers: string[] = [];
  let hasNextPage = false;
  do {
    tickers = tickers.concat(
      (await page.$$eval(TICKERS_SELECTOR, (elements: Element[]) =>
        elements.map(item => item.textContent)
      )) as string[]
    );

    const nextPageText: string = (await page.$eval(
      NEXT_PAGE_SELECTOR,
      (element: Element) => element.textContent
    )) as string;

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

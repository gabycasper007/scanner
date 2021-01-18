import { Browser } from 'puppeteer';
import { SCREENER_QUOTE } from './constants';

const getFinancialRatiosForTicker = async (browser: Browser, quote: string) => {
  const page = await browser.newPage();

  await page.goto(`${SCREENER_QUOTE}${quote}`, {
    waitUntil: 'networkidle0',
  });

  const TITLES_SELECTOR = '.snapshot-td2-cp';
  const VALUES_SELECTOR = '.snapshot-td2';
  enum relevantRatios {
    'EPS past 5Y' = 'EPS past 5Y',
    'EPS this Y' = 'EPS this Y',
    'EPS Q/Q' = 'EPS Q/Q',
    'Sales past 5Y' = 'Sales past 5Y',
    'Sales Q/Q' = 'Sales Q/Q',
    'ROE' = 'ROE',
    'Profit Margin' = 'Profit Margin',
    'Quick Ratio' = 'Quick Ratio',
    'Debt/Eq' = 'Debt/Eq',
    'LT Debt/Eq' = 'LT Debt/Eq',
    '52W High' = '52W High',
    'SMA200' = 'SMA200',
    'SMA50' = 'SMA50',
    'SMA20' = 'SMA20',
    'Short Ratio' = 'Short Ratio',
  }

  const titles = (await page.$$eval(TITLES_SELECTOR, elements =>
    elements.map(item => item.textContent)
  )) as relevantRatios[];

  const values = await page.$$eval(VALUES_SELECTOR, elements =>
    elements.map(item => item.textContent)
  );

  type Ratios = {
    [key in relevantRatios]: string;
  };

  let ratios = {} as Ratios;
  titles.forEach((title, index) => {
    if (Object.values(relevantRatios).includes(title)) {
      ratios[title] = values[index];
    }
  });

  return ratios;
};
export default getFinancialRatiosForTicker;

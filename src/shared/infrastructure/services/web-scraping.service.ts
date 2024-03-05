import puppeteer, { Browser, Page } from 'puppeteer';

export abstract class WebScrappingService {
  protected _browser: Browser | undefined;

  protected async browser(): Promise<Browser> {
    if (!this._browser) {
      this._browser = await puppeteer.launch({
        headless: 'shell',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }

    return this._browser;
  }

  protected async navigateToPage(url: string): Promise<Page> {
    const browser = await this.browser();

    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'domcontentloaded' });

    return page;
  }

  protected async close(): Promise<void> {
    return (await this.browser()).close();
  }
}

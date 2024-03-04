import pupper from 'puppeteer';

export class WebScrappingService {
  async execute(): Promise<void> {
    const browser = await pupper.launch({
      headless: 'shell',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    await page.goto('https://example.com');

    await browser.close();
  }
}

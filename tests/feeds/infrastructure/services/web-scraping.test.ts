import { WebScrappingService } from '../../../../src/feeds/infrastructure/services/web-scrapping.service';

describe('WebScrappingService Test', () => {
  let webScrapping: WebScrappingService;

  beforeEach(() => {
    webScrapping = new WebScrappingService();
  });

  it('open web page', async () => {
    await expect(webScrapping.execute()).resolves.toBeUndefined();
  });
});

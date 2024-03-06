import { FeedEntity } from '../../../../../src/feeds/domain/entities';
import { ESourceCode } from '../../../../../src/feeds/domain/enums';
import { ElPaisScrapingService } from '../../../../../src/feeds/infrastructure/services/scraping/elpais.service';
import { TUuid } from '../../../../../src/shared/domain/types';
import { UuidBuilder } from '../../../../shared/domain/builders/uuid.builder';

describe('ElPaisScrapingService Test', () => {
  let webScraping: ElPaisScrapingService;

  const url = 'https://elpais.com/';
  const limit = 7;

  const uuidGenerator = {
    execute: jest.fn((): TUuid => UuidBuilder.random()),
  };

  beforeEach(() => {
    webScraping = new ElPaisScrapingService(url, uuidGenerator);
  });

  afterEach(() => {
    uuidGenerator.execute.mockRestore();
  });

  it.only('should return feed entities', async () => {
    const result = await webScraping.execute();

    expect(Array.isArray(result)).toBe(true);

    expect(result.length <= limit).toBe(true);

    expect(uuidGenerator.execute).toHaveBeenCalledTimes(result.length);

    result.forEach((item) => {
      expect(item).toBeInstanceOf(FeedEntity);

      expect(item.source.code).toBe(ESourceCode.elPais);
    });
  });
});

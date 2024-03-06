import { FeedEntity } from '../../../../../src/feeds/domain/entities';
import { ESourceCode } from '../../../../../src/feeds/domain/enums';
import { ElMundoScrapingService } from '../../../../../src/feeds/infrastructure/services/scraping/elmundo.service';
import { TUuid } from '../../../../../src/shared/domain/types';
import { UuidBuilder } from '../../../../shared/domain/builders/uuid.builder';

describe('ElMundoScrapingService Test', () => {
  let webScraping: ElMundoScrapingService;

  const url = 'https://www.elmundo.es/';

  const limit = 7;

  const uuidGenerator = {
    execute: jest.fn((): TUuid => UuidBuilder.random()),
  };

  beforeEach(() => {
    webScraping = new ElMundoScrapingService(url, uuidGenerator);
  });

  afterEach(() => {
    uuidGenerator.execute.mockRestore();
  });

  it.only('should return feed entities', async () => {
    const result = await webScraping.execute(limit);

    expect(Array.isArray(result)).toBe(true);

    expect(uuidGenerator.execute).toHaveBeenCalledTimes(result.length);

    expect(result.length <= limit).toBe(true);

    result.forEach((item) => {
      expect(item).toBeInstanceOf(FeedEntity);

      expect(item.source.code).toBe(ESourceCode.elMundo);
    });
  });
});

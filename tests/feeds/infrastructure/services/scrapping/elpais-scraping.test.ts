import { FeedEntity } from '../../../../../src/feeds/domain/entities';
import { ESourceCode } from '../../../../../src/feeds/domain/enums';
import { ElPaisScrappingService } from '../../../../../src/feeds/infrastructure/services/scrapping/elpais.service';
import { TUuid } from '../../../../../src/shared/domain/types';

describe('ElPaisScrappingService Test', () => {
  let webScrapping: ElPaisScrappingService;

  const uuidGenerator = {
    execute: jest.fn((): TUuid => 'test-test-test-test-test'),
  };

  beforeEach(() => {
    webScrapping = new ElPaisScrappingService(uuidGenerator);
  });

  afterEach(() => {
    uuidGenerator.execute.mockRestore();
  });

  it.only('should return feed entities', async () => {
    const result = await webScrapping.execute();

    expect(Array.isArray(result)).toBe(true);

    expect(uuidGenerator.execute).toHaveBeenCalledTimes(result.length);

    result.forEach((item) => {
      expect(item).toBeInstanceOf(FeedEntity);

      expect(item.source.code).toBe(ESourceCode.elPais);
    });
  });
});

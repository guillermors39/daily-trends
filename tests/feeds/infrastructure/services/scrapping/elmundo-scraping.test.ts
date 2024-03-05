import { FeedEntity } from '../../../../../src/feeds/domain/entities';
import { ESourceCode } from '../../../../../src/feeds/domain/enums';
import { ElMundoScrappingService } from '../../../../../src/feeds/infrastructure/services/scrapping/elmundo.service';
import { TUuid } from '../../../../../src/shared/domain/types';

describe('ElMundoScrappingService Test', () => {
  let webScrapping: ElMundoScrappingService;

  const uuidGenerator = {
    execute: jest.fn((): TUuid => 'test-test-test-test-test'),
  };

  beforeEach(() => {
    webScrapping = new ElMundoScrappingService(uuidGenerator);
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

      expect(item.source.code).toBe(ESourceCode.elMundo);
    });
  });
});

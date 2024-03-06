import { IScrapingServiceFactory } from '../../../../src/feeds/domain/contracts';
import { ESourceCode } from '../../../../src/feeds/domain/enums';
import { ElMundoScrapingService } from '../../../../src/feeds/infrastructure/services/scraping/elmundo.service';
import { ElPaisScrapingService } from '../../../../src/feeds/infrastructure/services/scraping/elpais.service';
import { ScrapingServiceFactory } from '../../../../src/feeds/infrastructure/services/scraping-service.factory';
import { IUuidGenerator } from '../../../../src/shared/domain/contracts/app.contract';
import { UuidBuilder } from '../../../shared/domain/builders/uuid.builder';

describe('ScrapingServiceFactory Test', () => {
  const uuidGenerator: IUuidGenerator = {
    execute: jest.fn(() => UuidBuilder.random()),
  };

  let factory: IScrapingServiceFactory;

  beforeEach(() => {
    factory = new ScrapingServiceFactory(uuidGenerator);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('default instance', async () => {
    const service = factory.create(ESourceCode.local, 'localhost');

    const result = await service.execute();

    expect(Array.isArray(result)).toBe(true);

    expect(result.length === 0).toBe(true);
  });

  it('ElPais instance', () => {
    const service = factory.create(ESourceCode.elPais, 'localhost');

    expect(service).toBeInstanceOf(ElPaisScrapingService);
  });

  it('default instance', () => {
    const service = factory.create(ESourceCode.elMundo, 'localhost');

    expect(service).toBeInstanceOf(ElMundoScrapingService);
  });
});

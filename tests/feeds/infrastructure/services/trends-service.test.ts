import {
  IScrapingServiceFactory,
  ITrendService,
} from '../../../../src/feeds/domain/contracts';
import { ESourceCode } from '../../../../src/feeds/domain/enums';
import { TrendsService } from '../../../../src/feeds/infrastructure/services/trends.service';

describe('TrendsService Test', () => {
  let trendService: ITrendService;

  const service = {
    execute: jest.fn(async () => []),
  };

  const factory: IScrapingServiceFactory = {
    create: jest.fn(() => service),
  };

  const config = {
    limit: 3,
    portals: {
      [ESourceCode.elMundo]: 'http://localhost/',
      [ESourceCode.elPais]: 'http://localhost/',
    },
  };

  beforeEach(() => {
    trendService = new TrendsService(factory, config);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be call with config params', async () => {
    const results = await trendService.execute();

    expect(Array.isArray(results)).toBe(true);

    expect(service.execute).toHaveBeenCalledWith(config.limit);
  });

  it('should be call with limit selected', async () => {
    const limit = 5;

    const results = await trendService.execute({ limit });

    expect(Array.isArray(results)).toBe(true);

    expect(service.execute).toHaveBeenCalledWith(limit);
  });

  it('should be call only services selected', async () => {
    const sources = [ESourceCode.elMundo];

    const results = await trendService.execute({ sources });

    expect(Array.isArray(results)).toBe(true);

    expect(service.execute).toHaveBeenCalledWith(config.limit);

    expect(factory.create).toHaveBeenCalledTimes(sources.length);

    expect(factory.create).toHaveBeenCalledWith(
      ESourceCode.elMundo,
      config.portals[ESourceCode.elMundo],
    );
  });
});

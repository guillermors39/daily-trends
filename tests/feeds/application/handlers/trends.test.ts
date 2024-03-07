import { faker } from '@faker-js/faker';

import { TrendsSearchHandler } from '../../../../src/feeds/application/handlers/trends.handler';
import {
  IFeedCreateRepository,
  ITrendService,
} from '../../../../src/feeds/domain/contracts';
import { FeedEntity } from '../../../../src/feeds/domain/entities';
import { ESourceCode } from '../../../../src/feeds/domain/enums';
import { TTrendsFilter } from '../../../../src/feeds/domain/types';
import { FeedEntityMother } from '../../domain/mothers/entity.mother';

describe('TrendsSearchHandler Test', () => {
  let handler: TrendsSearchHandler;

  const repository: IFeedCreateRepository = {
    create: jest.fn(async () => {}),
  };

  const trendService: ITrendService = {
    execute: jest.fn(async ({ limit = 5 }: TTrendsFilter) => {
      const randomLimit = faker.helpers.rangeToNumber({ min: 0, max: limit });

      return Array.from({ length: randomLimit }).map(() =>
        FeedEntityMother.createFromExternal(),
      );
    }),
  };

  beforeEach(() => {
    handler = new TrendsSearchHandler(trendService, repository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return entities random', async () => {
    const results = await handler.execute();

    expect(trendService.execute).toHaveBeenCalledWith({});

    expect(repository.create).toHaveBeenCalledWith(...results);

    results.map((item) => {
      expect(item).toBeInstanceOf(FeedEntity);
    });
  });

  it('should return entities respecting params', async () => {
    const params = { limit: 3, sources: [ESourceCode.elMundo] };

    const results = await handler.execute(params);

    expect(results.length <= params.limit).toBe(true);

    expect(trendService.execute).toHaveBeenCalledWith(params);

    expect(repository.create).toHaveBeenCalledWith(...results);
  });
});

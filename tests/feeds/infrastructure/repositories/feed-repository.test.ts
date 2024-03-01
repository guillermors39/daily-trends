import { IFeedCreateRepository } from '../../../../src/feeds/domain/contracts';
import { FeedModel } from '../../../../src/feeds/infrastructure/models';
import { feedMapper } from '../../../../src/feeds/infrastructure/providers';
import { FeedRepository } from '../../../../src/feeds/infrastructure/repositories/feed.repository';
import { FeedEntityMother } from '../../domain/mothers/entity.mother';

jest
  .spyOn(FeedModel, 'create')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .mockImplementation((obj: any) => Promise.resolve({ _id: 'test', ...obj }));

describe('FeedRepository Test', () => {
  let repository: IFeedCreateRepository;

  beforeEach(() => {
    repository = new FeedRepository(FeedModel, feedMapper);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('create - ok', async () => {
    const feed = FeedEntityMother.create();
    const mappedDto = feedMapper.fromEntityToInfraDto(feed);

    await repository.create(feed);

    expect(FeedModel.create).toHaveBeenCalledWith(mappedDto);
    expect(FeedModel.create).toHaveBeenCalledTimes(1);
  });
});
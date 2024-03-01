import { FeedFindHandler } from '../../../../src/feeds/application/handlers';
import { IFeedFindRepository } from '../../../../src/feeds/domain/contracts';
import { FeedEntityMother } from '../../domain/mothers/entity.mother';

describe('FeedFindeHandler Test', () => {
  let handler: FeedFindHandler;
  let repository: IFeedFindRepository;

  const entityMocked = FeedEntityMother.create();

  const MockRepository = jest.fn(() => ({
    find: jest.fn(() => Promise.resolve(entityMocked)),
  }));

  beforeEach(() => {
    repository = new MockRepository();
    handler = new FeedFindHandler(repository);
  });

  it('should ask repository and find a feed', async () => {
    await expect(handler.execute(entityMocked.uuid)).resolves.toEqual(
      entityMocked,
    );

    expect(repository.find).toHaveBeenCalledWith(entityMocked.uuid);
  });
});

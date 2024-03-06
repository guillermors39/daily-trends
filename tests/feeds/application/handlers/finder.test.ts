import { FeedFindHandler } from '../../../../src/feeds/application/handlers';
import { IFeedFindRepository } from '../../../../src/feeds/domain/contracts';
import { FeedNotFoundException } from '../../../../src/feeds/domain/exceptions';
import { TUuid } from '../../../../src/shared/domain/types';
import { UuidBuilder } from '../../../shared/domain/builders/uuid.builder';
import { FeedEntityMother } from '../../domain/mothers/entity.mother';

describe('FeedFindeHandler Test', () => {
  let handler: FeedFindHandler;
  let repository: IFeedFindRepository;

  const entityMocked = FeedEntityMother.create();

  const MockRepository = jest.fn(() => ({
    find: jest.fn((uuid: TUuid) => {
      if (entityMocked.uuid === uuid) {
        return Promise.resolve(entityMocked);
      }

      return Promise.resolve(null);
    }),
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

  it('should throw a not found exception when feed is not found', async () => {
    const nonExistentUuid = UuidBuilder.random();

    await expect(handler.execute(nonExistentUuid)).rejects.toThrow(
      FeedNotFoundException,
    );

    expect(repository.find).toHaveBeenCalledWith(nonExistentUuid);
  });
});

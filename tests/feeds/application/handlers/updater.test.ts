import { FeedUpdateHandler } from '../../../../src/feeds/application/handlers';
import { IFeedUpdateRepository } from '../../../../src/feeds/domain/contracts';
import { FeedEntity } from '../../../../src/feeds/domain/entities';
import { TFeedCreate, TFeedUpdate } from '../../../../src/feeds/domain/types';
import { IHandler } from '../../../../src/shared/domain/contracts/app.contract';
import { TUuid } from '../../../../src/shared/domain/types';
import { FeedCreateMother } from '../../domain/mothers/create.mother';
import { FeedEntityMother } from '../../domain/mothers/entity.mother';

describe('FeedUpdateHandler Test', () => {
  let handler: FeedUpdateHandler;
  let data: TFeedCreate;
  let repository: IFeedUpdateRepository;

  const entityMocked = FeedEntityMother.create();

  const MockFinder = jest.fn(
    (): IHandler<TUuid, FeedEntity> => ({
      execute: () => Promise.resolve(entityMocked),
    }),
  );

  const MockRepository = jest.fn(() => ({
    update: jest.fn(() => Promise.resolve()),
  }));

  beforeEach(() => {
    const finder = new MockFinder();
    repository = new MockRepository();

    handler = new FeedUpdateHandler(finder, repository);
    data = FeedCreateMother.create();
  });

  it('should return entity when exists', async () => {
    const updateData: TFeedUpdate = {
      ...data,
      uuid: entityMocked.uuid,
    };

    const updatedEntity = await handler.execute(updateData);

    expect(repository.update).toHaveBeenCalledWith(updatedEntity);

    expect(updatedEntity.uuid).toEqual(entityMocked.uuid);
  });
});

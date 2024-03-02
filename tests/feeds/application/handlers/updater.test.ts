import { FeedUpdateHandler } from '../../../../src/feeds/application/handlers';
import { FeedEntity } from '../../../../src/feeds/domain/entities';
import { TFeedCreate, TFeedUpdate } from '../../../../src/feeds/domain/types';
import { IHandler } from '../../../../src/shared/domain/contracts/app.contract';
import { TUuid } from '../../../../src/shared/domain/types';
import { FeedCreateMother } from '../../domain/mothers/create.mother';
import { FeedEntityMother } from '../../domain/mothers/entity.mother';

describe('FeedUpdateHandler Test', () => {
  let handler: FeedUpdateHandler;
  let data: TFeedCreate;

  const entityMocked = FeedEntityMother.create();

  const MockFinder = jest.fn(
    (): IHandler<TUuid, FeedEntity> => ({
      execute: () => Promise.resolve(entityMocked),
    }),
  );

  beforeEach(() => {
    const finder = new MockFinder();
    handler = new FeedUpdateHandler(finder);
    data = FeedCreateMother.create();
  });

  it('should return entity when exists', async () => {
    const updateData: TFeedUpdate = {
      ...data,
      uuid: entityMocked.uuid,
    };

    const updatedEntity = await handler.execute(updateData);

    expect(updatedEntity.uuid).toEqual(entityMocked.uuid);
  });
});

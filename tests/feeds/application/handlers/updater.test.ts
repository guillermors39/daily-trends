import { FeedUpdateHandler } from '../../../../src/feeds/application/handlers';
import {
  IFeedUpdateRepository,
  IFeedValidator,
} from '../../../../src/feeds/domain/contracts';
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

  const entityMocked = FeedEntityMother.createFromLocal();

  const MockFinder = jest.fn(
    (): IHandler<TUuid, FeedEntity> => ({
      execute: () => Promise.resolve(entityMocked),
    }),
  );

  const MockRepository = jest.fn(() => ({
    update: jest.fn(() => Promise.resolve()),
  }));

  const mockValidator: IFeedValidator = {
    validate: jest.fn(async () => {}),
  };

  beforeEach(() => {
    const finder = new MockFinder();
    repository = new MockRepository();

    handler = new FeedUpdateHandler(finder, mockValidator, repository);
    data = FeedCreateMother.create();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return entity when exists', async () => {
    const updateData: TFeedUpdate = {
      ...data,
      uuid: entityMocked.uuid.value,
    };

    const updatedEntity = await handler.execute(updateData);

    expect(repository.update).toHaveBeenCalledWith(updatedEntity);

    expect(mockValidator.validate).toHaveBeenCalledTimes(1);

    expect(mockValidator.validate).toHaveBeenCalledWith(updatedEntity);

    expect(updatedEntity.uuid.value).toEqual(entityMocked.uuid.value);
  });
});

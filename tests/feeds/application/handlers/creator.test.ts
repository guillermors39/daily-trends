import { FeedCreateHandler } from '../../../../src/feeds/application/handlers';
import {
  IFeedAsyncValidator,
  IFeedCreateRepository,
} from '../../../../src/feeds/domain/contracts';
import { FeedEntity } from '../../../../src/feeds/domain/entities';
import { IUuidGenerator } from '../../../../src/shared/domain/contracts/app.contract';
import { TUuid } from '../../../../src/shared/domain/types';
import { UuidBuilder } from '../../../shared/domain/builders/uuid.builder';
import { FeedCreateMother } from '../../domain/mothers/create.mother';

const uuidMoked = UuidBuilder.random();

describe('FeedCreateHandler Test', () => {
  let handler: FeedCreateHandler;
  let uuidGenerator: IUuidGenerator;
  let repository: IFeedCreateRepository;

  const MockRepository = jest.fn(() => ({
    create: jest.fn(async () => {}),
  }));

  const MockUuidGenerator = jest.fn(() => ({
    execute: jest.fn((): TUuid => uuidMoked),
  }));

  const mockValidator: IFeedAsyncValidator = {
    validate: jest.fn(async () => {}),
  };

  beforeEach(() => {
    repository = new MockRepository();
    uuidGenerator = new MockUuidGenerator();

    handler = new FeedCreateHandler(uuidGenerator, mockValidator, repository);
  });

  it('should create FeedEntity and call repository.create', async () => {
    const dto = FeedCreateMother.create();

    const mockEntity = FeedEntity.create(uuidMoked, dto);

    await expect(handler.execute(dto)).resolves.toEqual(mockEntity);

    expect(uuidGenerator.execute).toHaveBeenCalledTimes(1);

    expect(mockValidator.validate).toHaveBeenCalledTimes(1);

    expect(mockValidator.validate).toHaveBeenCalledWith(mockEntity);

    expect(repository.create).toHaveBeenCalledWith(mockEntity);
  });
});

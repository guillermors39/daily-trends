import { IFeedFindByTitleRepository } from '../../../../src/feeds/domain/contracts';
import { FeedTitleAlreadyExistsException } from '../../../../src/feeds/domain/exceptions';
import { FeedCreateValidator } from '../../../../src/feeds/domain/services/create.validator';
import { FeedEntityMother } from '../mothers/entity.mother';

describe('FeedCreateValidator Test', () => {
  let validator: FeedCreateValidator;

  const existentTitle = 'A title';

  const mockEntityFound = FeedEntityMother.createFromLocal({
    title: existentTitle,
  });

  const repository: IFeedFindByTitleRepository = {
    findByTitle: jest.fn(async (title: string) => {
      if (title === existentTitle) {
        return mockEntityFound;
      }

      return null;
    }),
  };

  beforeEach(() => {
    validator = new FeedCreateValidator(repository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return undefined', async () => {
    const newTitle = 'A new title';

    const entity = FeedEntityMother.createFromLocal({ title: newTitle });

    await expect(validator.validate(entity)).resolves.toBeUndefined();

    expect(repository.findByTitle).toHaveBeenCalledWith(newTitle);
  });

  it('should throw title already exists exception', async () => {
    const entity = FeedEntityMother.createFromLocal({ title: existentTitle });

    await expect(validator.validate(entity)).rejects.toThrow(
      FeedTitleAlreadyExistsException,
    );

    expect(repository.findByTitle).toHaveBeenCalledWith(existentTitle);
  });
});

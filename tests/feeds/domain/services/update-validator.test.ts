import { IFeedFindByTitleRepository } from '../../../../src/feeds/domain/contracts';
import {
  FeedCannotModifyExternal,
  FeedTitleAlreadyExistsException,
} from '../../../../src/feeds/domain/exceptions';
import { FeedUpdateValidator } from '../../../../src/feeds/domain/services/update.validator';
import { FeedEntityMother } from '../mothers/entity.mother';

describe('FeedUpdateValidator Test', () => {
  it('should return undefined', async () => {
    const newTitle = 'A new title';

    const repository: IFeedFindByTitleRepository = {
      findByTitle: jest.fn(async () => null),
    };

    const validator = new FeedUpdateValidator(repository);

    const entity = FeedEntityMother.createFromLocal({ title: newTitle });

    await expect(validator.validate(entity)).resolves.toBeUndefined();

    expect(repository.findByTitle).toHaveBeenCalledWith(newTitle);
  });

  it('should exists entity and return undefined', async () => {
    const existentTitle = 'A title';

    const mockEntityFound = FeedEntityMother.createFromLocal({
      title: existentTitle,
    });

    const repository: IFeedFindByTitleRepository = {
      findByTitle: jest.fn(async () => mockEntityFound),
    };

    const validator = new FeedUpdateValidator(repository);

    await expect(validator.validate(mockEntityFound)).resolves.toBeUndefined();

    expect(repository.findByTitle).toHaveBeenCalledWith(
      mockEntityFound.title.value,
    );
  });

  it('should throw cannot modify external sources', async () => {
    const mockEntityFound = FeedEntityMother.createFromExternal();

    const repository: IFeedFindByTitleRepository = {
      findByTitle: jest.fn(async () => mockEntityFound),
    };

    const validator = new FeedUpdateValidator(repository);

    await expect(validator.validate(mockEntityFound)).rejects.toThrow(
      FeedCannotModifyExternal,
    );
  });

  it('should throw title already exists exception', async () => {
    const existentTitle = 'A title';

    const mockEntityFound = FeedEntityMother.createFromLocal({
      title: existentTitle,
    });

    const repository: IFeedFindByTitleRepository = {
      findByTitle: jest.fn(async () => mockEntityFound),
    };

    const validator = new FeedUpdateValidator(repository);

    const entity = FeedEntityMother.createFromLocal({ title: existentTitle });

    await expect(validator.validate(entity)).rejects.toThrow(
      FeedTitleAlreadyExistsException,
    );
  });
});

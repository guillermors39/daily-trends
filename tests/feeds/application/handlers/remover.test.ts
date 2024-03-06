import { FeedDeleteHandler } from '../../../../src/feeds/application/handlers';
import { FeedNotFoundException } from '../../../../src/feeds/domain/exceptions';
import { TUuid } from '../../../../src/shared/domain/types';
import { FeedEntityMother } from '../../domain/mothers/entity.mother';

describe('FeedDeleteHandler Test', () => {
  const entityMocked = FeedEntityMother.create();

  const finder = {
    execute: jest.fn((uuid: TUuid) => {
      if (uuid === entityMocked.uuid.value) {
        return Promise.resolve(entityMocked);
      }

      return Promise.reject(new FeedNotFoundException(uuid));
    }),
  };

  const repository = {
    delete: jest.fn(() => Promise.resolve()),
  };

  const validator = {
    validate: jest.fn(() => {}),
  };

  const handler = new FeedDeleteHandler(finder, validator, repository);

  beforeEach(() => {
    repository.delete.mockClear();
    finder.execute.mockClear();
  });

  it('should call repository to delete', async () => {
    await expect(
      handler.execute(entityMocked.uuid.value),
    ).resolves.toBeUndefined();

    expect(finder.execute).toHaveBeenCalledWith(entityMocked.uuid.value);

    expect(validator.validate).toHaveBeenCalled();

    expect(repository.delete).toHaveBeenCalledWith(entityMocked.uuid.value);
  });
});

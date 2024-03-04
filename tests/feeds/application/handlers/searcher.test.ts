import { FeedSearchHandler } from '../../../../src/feeds/application/handlers';
import { IFeedSearchRepository } from '../../../../src/feeds/domain/contracts';
import { PaginatedDto } from '../../../../src/shared/domain/dtos/paginated.dto';
import { PaginatedDtoMother } from '../../../shared/domain/paginated-dto.mother';

describe('FeedSearchHandler Test', () => {
  let handler: FeedSearchHandler;

  const repository: IFeedSearchRepository = {
    search: jest.fn(() => Promise.resolve(PaginatedDtoMother.create())),
  };

  beforeEach(() => {
    handler = new FeedSearchHandler(repository);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return a paginated entity with defaults values', async () => {
    const result = await handler.execute({});

    expect(repository.search).toHaveBeenCalledWith({
      page: 1,
      perPage: handler.defaultPerPage,
    });

    expect(result).toBeInstanceOf(PaginatedDto);
  });
});

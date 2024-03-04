import { IHandler } from '../../../shared/domain/contracts/app.contract';
import { PaginatedDto } from '../../../shared/domain/dtos/paginated.dto';
import { IFeedSearchRepository } from '../../domain/contracts';
import { FeedEntity } from '../../domain/entities';
import { TFeedSearch } from '../../domain/types';

export class FeedSearchHandler
  implements IHandler<TFeedSearch, PaginatedDto<FeedEntity>>
{
  public readonly defaultPerPage: number = 20;

  constructor(private readonly repository: IFeedSearchRepository) {}

  async execute({
    page = 1,
    perPage = this.defaultPerPage,
  }: TFeedSearch): Promise<PaginatedDto<FeedEntity>> {
    return this.repository.search({ page, perPage });
  }
}

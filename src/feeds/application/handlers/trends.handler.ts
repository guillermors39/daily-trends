import { IHandler } from '../../../shared/domain/contracts/app.contract';
import { IFeedCreateRepository, ITrendService } from '../../domain/contracts';
import { FeedEntity } from '../../domain/entities';
import { TTrendsFilter } from '../../domain/types';

export class TrendsSearchHandler
  implements IHandler<TTrendsFilter, FeedEntity[]>
{
  constructor(
    private readonly service: ITrendService,
    private readonly repository: IFeedCreateRepository,
  ) {}

  async execute(dto: TTrendsFilter): Promise<FeedEntity[]> {
    const entities = await this.service.execute(dto);

    await this.repository.create(...entities);

    return entities;
  }
}

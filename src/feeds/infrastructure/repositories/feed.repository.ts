import { IMapper } from '../../../shared/infrastructure/contracts';
import { IFeedCreateRepository } from '../../domain/contracts';
import { FeedEntity } from '../../domain/entities';
import { IFeedModel, TFeedModelDto } from '../models';

export class FeedRepository implements IFeedCreateRepository {
  constructor(
    private readonly model: IFeedModel,
    private readonly mapper: IMapper<FeedEntity, TFeedModelDto>,
  ) {}

  async create(feed: FeedEntity): Promise<void> {
    const dto = this.mapper.fromEntityToInfraDto(feed);

    await this.model.create(dto);
  }
}

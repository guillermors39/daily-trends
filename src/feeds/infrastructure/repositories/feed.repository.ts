import { TUuid } from '../../../shared/domain/types';
import { IMapper } from '../../../shared/infrastructure/contracts';
import {
  IFeedCreateRepository,
  IFeedFindRepository,
} from '../../domain/contracts';
import { FeedEntity } from '../../domain/entities';
import { TFeedDto } from '../../domain/types';
import { IFeedModel } from '../models';

export class FeedRepository
  implements IFeedCreateRepository, IFeedFindRepository
{
  constructor(
    private readonly model: IFeedModel,
    private readonly mapper: IMapper<FeedEntity, TFeedDto>,
  ) {}

  async create(feed: FeedEntity): Promise<void> {
    const dto = this.mapper.fromEntityToInfraDto(feed);

    await this.model.create(dto);
  }

  async find(uuid: TUuid): Promise<FeedEntity | null> {
    const model = await this.model.findOne({ uuid });

    if (!model) return null;

    const dto = this.mapper.fromInfraToDto(model);

    return FeedEntity.fromDto(dto);
  }
}

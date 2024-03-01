import { IFeedCreateRepository } from '../../domain/contracts';
import { FeedEntity } from '../../domain/entities';
import { FeedEntityToModelMapper } from '../mappers/feed.mapper';
import { FeedModel, IFeedModel } from '../models';

export class FeedRepository implements IFeedCreateRepository {
  private readonly model: IFeedModel;

  constructor() {
    this.model = FeedModel;
  }

  async create(feed: FeedEntity): Promise<void> {
    const dto = FeedEntityToModelMapper.execute(feed);

    await this.model.create(dto);
  }
}

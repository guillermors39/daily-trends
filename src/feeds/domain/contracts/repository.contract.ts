import { FeedEntity } from '../entities';

export interface IFeedCreateRepository {
  create(feed: FeedEntity): Promise<void>;
}

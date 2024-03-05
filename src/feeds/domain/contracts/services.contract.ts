import { FeedEntity } from '../entities';

export interface IFeedScrapping {
  execute(): Promise<FeedEntity[]>;
}

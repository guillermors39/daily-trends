import { Properties } from '../../../shared/domain/types';
import { FeedEntity } from '../entities';

export type TFeedCreate = {
  readonly title: string;
  readonly subtitle: string;
  readonly body: string;
  readonly authors: string[];
  readonly location: string;
  readonly date: Date;
};

export type TFeedDto = Properties<FeedEntity>;

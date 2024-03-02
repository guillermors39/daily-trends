import { Properties, TUuid } from '../../../shared/domain/types';
import { FeedEntity } from '../entities';

export type TFeedCreate = {
  readonly title: string;
  readonly subtitle: string;
  readonly body: string;
  readonly authors: string[];
  readonly location: string;
  readonly date: Date;
};

export type TFeedUpdate = TFeedCreate & {
  readonly uuid: TUuid;
};

export type TFeedDto = Properties<FeedEntity>;

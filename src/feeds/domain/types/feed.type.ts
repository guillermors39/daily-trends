import { TUuid } from '../../../shared/domain/types';
import { ESourceCode } from '../enums';

export type TSource = {
  readonly code: ESourceCode;
  readonly url: string;
};

export type TFeedDto = {
  readonly uuid: TUuid;
  readonly title: string;
  readonly body: string;
  readonly location: string;
  readonly authors: string[];
  readonly source: TSource;
  readonly date: Date;
};

export type TFeedCreate = Omit<TFeedDto, 'uuid' | 'source'>;

export type TFeedCreateFromSource = Omit<TFeedDto, 'uuid'>;

export type TFeedUpdate = TFeedCreate & {
  readonly uuid: TUuid;
};

export type TFeedSearch = {
  page?: number;
  perPage?: number;
};

export type TTrendsFilter = {
  readonly sources?: ESourceCode[];
  readonly limit?: number;
};

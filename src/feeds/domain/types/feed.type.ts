import { TUuid } from '../../../shared/domain/types';
import { ESourceCode } from '../enums';

export type TFeedCreate = {
  readonly title: string;
  readonly subtitle: string;
  readonly body: string;
  readonly authors: string[];
  readonly location: string;
  readonly date: Date;
};

export type TFeedCreateFromSource = TFeedCreate & {
  source: TSource;
};

export type TFeedUpdate = TFeedCreate & {
  readonly uuid: TUuid;
};

export type TFeedSearch = {
  page?: number;
  perPage?: number;
};

export type TSource = {
  readonly code: ESourceCode;
  readonly url: string;
};

export type TFeedDto = {
  readonly uuid: TUuid;
  readonly title: string;
  readonly subtitle: string;
  readonly body: string;
  readonly location: string;
  readonly authors: string[];
  readonly source: TSource;
  readonly date: Date;
};

export type TTrendsFilter = {
  readonly sources?: ESourceCode[];
  readonly limit?: number;
};

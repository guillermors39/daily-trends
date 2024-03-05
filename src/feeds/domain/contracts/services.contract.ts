import { TPaginationSearch } from '../../../shared/domain/contracts/app.contract';
import { FeedEntity } from '../entities';
import { ESourceCode } from '../enums';
import { TTrendsFilter } from '../types';

export interface IFeedScraping {
  execute(limit?: number): Promise<FeedEntity[]>;
}

export type TSort = {
  [key: string]: 1 | -1;
};

export type TPaginationParams = TPaginationSearch & {
  filters?: object;
  sort?: TSort;
};

export interface IScrapingServiceFactory {
  create(sourceCode: ESourceCode, url: string): IFeedScraping;
}

export interface ITrendService {
  execute(filters: TTrendsFilter): Promise<FeedEntity[]>;
}

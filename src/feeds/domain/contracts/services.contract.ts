import { TPaginationSearch } from '../../../shared/domain/contracts/app.contract';
import { FeedEntity } from '../entities';

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

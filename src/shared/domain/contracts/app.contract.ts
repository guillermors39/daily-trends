import { TUuid } from '../types';

export interface IUuidGenerator {
  execute(): TUuid;
}

export interface IHandler<Input = unknown, Output = void> {
  execute(dto?: Input): Output | Promise<Output>;
}

export type TPaginationSearch = {
  page: number;
  perPage: number;
};

type TPage = {
  current: number;
  total: number;
};

type TItem = {
  count: number;
  total: number;
};

export type TPagination = {
  readonly pages: TPage;
  readonly items: TItem;
};

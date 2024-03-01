import { TUuid } from '../types';

export interface IUuidGenerator {
  execute(): TUuid;
}

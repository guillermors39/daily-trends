import { TUuid } from '../types';

export interface IUuidGenerator {
  execute(): TUuid;
}

export interface IHandler<Input, Output> {
  execute(dto?: Input): Output | Promise<Output>;
}

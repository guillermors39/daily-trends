import { TUuid } from '../types';

export interface IUuidGenerator {
  execute(): TUuid;
}

export interface IHandler<Input = unknown, Output = void> {
  execute(dto?: Input): Output | Promise<Output>;
}

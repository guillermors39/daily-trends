import { ObjectSchema } from 'joi';

export enum ERequestValue {
  Body = 'body',
  Query = 'query',
  Headers = 'headers',
  Params = 'params',
}

export type TSchemasConfig = Partial<Record<ERequestValue, ObjectSchema>>;

import { Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export enum ERequestValue {
  Body = 'body',
  Query = 'query',
  Headers = 'headers',
  Params = 'params',
}

export type TSchemasConfig = Partial<Record<ERequestValue, ObjectSchema>>;

export interface IController {
  execute(req: Request, res: Response): Promise<void>;
  schema?(): TSchemasConfig;
}

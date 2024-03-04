import { Request } from 'express';

import { ERequestValue, TSchemasConfig } from '../contracts';
import { BadRequestError } from '../errors';

export const validateRequest = async (
  schemas: TSchemasConfig,
  req: Request,
) => {
  for (const [key, schema] of Object.entries(schemas)) {
    if (!!schema) {
      const requestPart = req[key as ERequestValue];

      try {
        await schema.validateAsync(requestPart, {
          abortEarly: false,
        });
      } catch (error) {
        if (error instanceof Error) {
          throw new BadRequestError(error.message);
        }
      }
    }
  }
};

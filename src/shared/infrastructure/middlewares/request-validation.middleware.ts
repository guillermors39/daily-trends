import { NextFunction, Request, Response } from 'express';

import { ERequestValue, IController, TSchemasConfig } from '../contracts';
import { BadRequestError } from '../errors';

const validateRequest = async (schemas: TSchemasConfig, req: Request) => {
  for (const [key, schema] of Object.entries(schemas)) {
    if (!!schema) {
      const requestPart = req[key as ERequestValue];

      try {
        await schema.validateAsync(requestPart, {
          abortEarly: false,
        });
      } catch (error) {
        if (error instanceof Error) {
          throw new BadRequestError({
            message: error.message,
          });
        }
      }
    }
  }
};

const validationMiddleware =
  (controller: IController) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (controller.schema) {
        const schemasConfig: TSchemasConfig = controller.schema();

        await validateRequest(schemasConfig, req);
      }

      next();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      res.status(400).json({ error: error?.message });
    }
  };

export default validationMiddleware;

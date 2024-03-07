import { request } from 'express';
import Joi from 'joi';

import { TSchemasConfig } from '../../../../src/shared/infrastructure/contracts';
import { BadRequestError } from '../../../../src/shared/infrastructure/errors';
import { validateRequest } from '../../../../src/shared/infrastructure/helpers/request';

describe('request helper test', () => {
  afterEach(() => {
    request.body = undefined;
  });

  it('should throw bad request error', async () => {
    const schema: TSchemasConfig = {
      body: Joi.object({
        name: Joi.string().required(),
      }),
    };

    request.body = {};

    await expect(validateRequest(schema, request)).rejects.toThrow(
      BadRequestError,
    );
  });
});

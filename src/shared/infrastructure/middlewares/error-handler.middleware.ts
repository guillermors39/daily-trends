import { ErrorRequestHandler, Response } from 'express';

import { ClientError } from '../errors';

const errorHandlerMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ClientError) {
    res.status(error.statusCode).json({ error: error.message });
  } else {
    if (!next) {
      (req as unknown as Response)
        .status(500)
        .json({ error: 'Internal Server Error' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

export default errorHandlerMiddleware;

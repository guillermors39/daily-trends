import { ErrorRequestHandler } from 'express';

import { ClientError } from '../errors';

const errorHandlerMiddleware: ErrorRequestHandler = (error, req, res) => {
  if (error instanceof ClientError) {
    res.status(error.statusCode).json({ error: error.message });
  } else {
    // Internal Server Error
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default errorHandlerMiddleware;

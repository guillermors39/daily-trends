import express from 'express';

import validationMiddleware from '../../../shared/infrastructure/middlewares/request-validation.middleware';
import { TRoute } from '../../../shared/infrastructure/types';
import { feedsCreateController } from '../providers';

const feedRouter = express.Router();

feedRouter.post(
  '/',
  validationMiddleware(feedsCreateController),
  feedsCreateController.execute.bind(feedsCreateController),
);

export const feedRoute: TRoute = {
  uri: '/feeds',
  router: feedRouter,
};

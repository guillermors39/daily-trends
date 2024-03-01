import express from 'express';

import validationMiddleware from '../../../shared/infrastructure/middlewares/request-validation.middleware';
import { TRoute } from '../../../shared/infrastructure/types';
import { feedsCreateController, feedsFindController } from '../providers';

const feedRouter = express.Router();

feedRouter.post(
  '/',
  validationMiddleware(feedsCreateController),
  feedsCreateController.execute.bind(feedsCreateController),
);

feedRouter.get(
  '/:uuid',
  validationMiddleware(feedsFindController),
  feedsFindController.execute.bind(feedsFindController),
);

export const feedRoute: TRoute = {
  uri: '/feeds',
  router: feedRouter,
};

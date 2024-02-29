import express from 'express';

import { TRoute } from '../../../shared/infrastructure/types';
import { feedsController } from '../providers';

const feedRouter = express.Router();

feedRouter.post('/', feedsController.create.bind(feedsController));

export const feedRoute: TRoute = {
  uri: '/feeds',
  router: feedRouter,
};

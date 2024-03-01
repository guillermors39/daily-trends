import express from 'express';

import { TRoute } from '../../../shared/infrastructure/types';
import { feedsCreateController } from '../providers';

const feedRouter = express.Router();

feedRouter.post('/', feedsCreateController.create.bind(feedsCreateController));

export const feedRoute: TRoute = {
  uri: '/feeds',
  router: feedRouter,
};

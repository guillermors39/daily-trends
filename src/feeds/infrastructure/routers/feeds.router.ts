import express from 'express';

import { TRoute } from '../../../shared/infrastructure/types';
import {
  feedsCreateController,
  feedsFindController,
  feedsUpdateController,
} from '../providers';

const feedRouter = express.Router();

feedRouter.post('/', feedsCreateController.execute.bind(feedsCreateController));

feedRouter.get('/:uuid', feedsFindController.execute.bind(feedsFindController));

feedRouter.put(
  '/:uuid',
  feedsFindController.execute.bind(feedsUpdateController),
);

export const feedRoute: TRoute = {
  uri: '/feeds',
  router: feedRouter,
};

import express from 'express';

import { TRoute } from '../../../shared/infrastructure/types';
import {
  feedsCreateController,
  feedsDeleteController,
  feedsFindController,
  feedsSearchController,
  feedsUpdateController,
} from '../providers';

const feedRouter = express.Router();

feedRouter.get('/', feedsSearchController.execute.bind(feedsSearchController));

feedRouter.post('/', feedsCreateController.execute.bind(feedsCreateController));

feedRouter.get('/:uuid', feedsFindController.execute.bind(feedsFindController));

feedRouter.delete(
  '/:uuid',
  feedsFindController.execute.bind(feedsDeleteController),
);

feedRouter.put(
  '/:uuid',
  feedsFindController.execute.bind(feedsUpdateController),
);

export const feedRoute: TRoute = {
  uri: '/feeds',
  router: feedRouter,
};

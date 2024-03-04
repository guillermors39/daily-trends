import {
  paginatorService,
  uuidGenerator,
} from '../../../shared/infrastructure/providers/app.providers';
import {
  FeedCreateHandler,
  FeedDeleteHandler,
  FeedFindHandler,
  FeedSearchHandler,
  FeedUpdateHandler,
} from '../../application/handlers';
import {
  FeedsCreateController,
  FeedsDeleteController,
  FeedsFindController,
  FeedsSearchController,
  FeedsUpdateController,
} from '../controllers';
import { FeedMapper } from '../mappers/feed.mapper';
import { FeedModel } from '../models';
import { FeedRepository } from '../repositories/feed.repository';

const feedMapper = new FeedMapper();

const feedRepository = new FeedRepository(
  FeedModel,
  feedMapper,
  paginatorService,
);

const feedSearchHandler = new FeedSearchHandler(feedRepository);

const feedCreateHandler = new FeedCreateHandler(uuidGenerator, feedRepository);

const feedFindHandler = new FeedFindHandler(feedRepository);

const feedsUpdateHandler = new FeedUpdateHandler(
  feedFindHandler,
  feedRepository,
);

const feedDeleteHandler = new FeedDeleteHandler(
  feedFindHandler,
  feedRepository,
);

const feedsCreateController = new FeedsCreateController(feedCreateHandler);

const feedsDeleteController = new FeedsDeleteController(feedDeleteHandler);

const feedsFindController = new FeedsFindController(feedFindHandler);

const feedsSearchController = new FeedsSearchController(feedSearchHandler);

const feedsUpdateController = new FeedsUpdateController(feedsUpdateHandler);

export {
  feedMapper,
  feedsCreateController,
  feedsDeleteController,
  feedsFindController,
  feedsSearchController,
  feedsUpdateController,
};

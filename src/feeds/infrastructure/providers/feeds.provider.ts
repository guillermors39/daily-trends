import { uuidGenerator } from '../../../shared/infrastructure/providers/app.providers';
import {
  FeedCreateHandler,
  FeedFindHandler,
  FeedUpdateHandler,
} from '../../application/handlers';
import {
  FeedsCreateController,
  FeedsDeleteController,
  FeedsFindController,
  FeedsUpdateController,
} from '../controllers';
import { FeedMapper } from '../mappers/feed.mapper';
import { FeedModel } from '../models';
import { FeedRepository } from '../repositories/feed.repository';

const feedMapper = new FeedMapper();

const feedRepository = new FeedRepository(FeedModel, feedMapper);

const feedCreateHandler = new FeedCreateHandler(uuidGenerator, feedRepository);

const feedFindHandler = new FeedFindHandler(feedRepository);

const feedsUpdateHandler = new FeedUpdateHandler(
  feedFindHandler,
  feedRepository,
);

const feedsCreateController = new FeedsCreateController(feedCreateHandler);

const feedsDeleteController = new FeedsDeleteController();

const feedsFindController = new FeedsFindController(feedFindHandler);

const feedsUpdateController = new FeedsUpdateController(feedsUpdateHandler);

export {
  feedMapper,
  feedsCreateController,
  feedsDeleteController,
  feedsFindController,
  feedsUpdateController,
};

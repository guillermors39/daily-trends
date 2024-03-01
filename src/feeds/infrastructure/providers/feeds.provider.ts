import { uuidGenerator } from '../../../shared/infrastructure/providers/app.providers';
import { FeedCreateHandler, FeedFindHandler } from '../../application/handlers';
import { FeedsCreateController, FeedsFindController } from '../controllers';
import { FeedMapper } from '../mappers/feed.mapper';
import { FeedModel } from '../models';
import { FeedRepository } from '../repositories/feed.repository';

const feedMapper = new FeedMapper();

const feedRepository = new FeedRepository(FeedModel, feedMapper);

const feedCreateHandler = new FeedCreateHandler(uuidGenerator, feedRepository);

const feedFindHandler = new FeedFindHandler(feedRepository);

const feedsCreateController = new FeedsCreateController(feedCreateHandler);

const feedsFindController = new FeedsFindController(feedFindHandler);

export {
  feedCreateHandler,
  feedMapper,
  feedsCreateController,
  feedsFindController,
};

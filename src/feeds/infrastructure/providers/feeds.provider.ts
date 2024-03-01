import { uuidGenerator } from '../../../shared/infrastructure/providers/app.providers';
import { FeedCreateHandler } from '../../application/handlers';
import { FeedsController } from '../controllers';
import { FeedMapper } from '../mappers/feed.mapper';
import { FeedModel } from '../models';
import { FeedRepository } from '../repositories/feed.repository';

const feedMapper = new FeedMapper();

const feedRepository = new FeedRepository(FeedModel, feedMapper);

const feedCreateHandler = new FeedCreateHandler(uuidGenerator, feedRepository);

const feedsController = new FeedsController(feedCreateHandler);

export { feedCreateHandler, feedMapper, feedsController };

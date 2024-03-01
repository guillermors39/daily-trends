import { uuidGenerator } from '../../../shared/infrastructure/providers/app.providers';
import { FeedCreateHandler } from '../../application/handlers';
import { FeedsCreateController } from '../controllers';
import { FeedMapper } from '../mappers/feed.mapper';
import { FeedModel } from '../models';
import { FeedRepository } from '../repositories/feed.repository';

const feedMapper = new FeedMapper();

const feedRepository = new FeedRepository(FeedModel, feedMapper);

const feedCreateHandler = new FeedCreateHandler(uuidGenerator, feedRepository);

const feedsCreateController = new FeedsCreateController(feedCreateHandler);

export { feedCreateHandler, feedMapper, feedsCreateController };

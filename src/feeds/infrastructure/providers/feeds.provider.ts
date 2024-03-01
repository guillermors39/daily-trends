import { uuidGenerator } from '../../../shared/infrastructure/providers/app.providers';
import { FeedCreateHandler } from '../../application/handlers';
import { FeedsController } from '../controllers';
import { FeedRepository } from '../repositories/feed.repository';

const feedRepository = new FeedRepository();

const feedCreateHandler = new FeedCreateHandler(uuidGenerator, feedRepository);

const feedsController = new FeedsController(feedCreateHandler);

export { feedCreateHandler, feedsController };

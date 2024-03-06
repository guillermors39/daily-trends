import { config } from '../../../shared/infrastructure/configs/config';
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
import { TrendsSearchHandler } from '../../application/handlers/trends.handler';
import { FeedCreateValidator } from '../../domain/services/create.validator';
import { FeedUpdateValidator } from '../../domain/services/update.validator';
import {
  FeedsCreateController,
  FeedsDeleteController,
  FeedsFindController,
  FeedsSearchController,
  FeedsUpdateController,
  TrendsController,
} from '../controllers';
import { FeedMapper } from '../mappers/feed.mapper';
import { FeedModel } from '../models';
import { FeedRepository } from '../repositories/feed.repository';
import { ScrapingServiceFactory } from '../services/scraping-service.factory';
import { TrendsService } from '../services/trends.service';

const mapper = new FeedMapper();

const repository = new FeedRepository(FeedModel, mapper, paginatorService);

const createValidator = new FeedCreateValidator(repository);

const updateValidator = new FeedUpdateValidator(repository);

const searchHandler = new FeedSearchHandler(repository);

const createHandler = new FeedCreateHandler(
  uuidGenerator,
  createValidator,
  repository,
);

const findHandler = new FeedFindHandler(repository);

const updateHandler = new FeedUpdateHandler(
  findHandler,
  updateValidator,
  repository,
);

const deleteHandler = new FeedDeleteHandler(findHandler, repository);

const scrapingServiceFactory = new ScrapingServiceFactory(uuidGenerator);

const trendsService = new TrendsService(
  scrapingServiceFactory,
  config.scraping,
);

const trendsSearchHandler = new TrendsSearchHandler(trendsService, repository);

const createController = new FeedsCreateController(createHandler);

const deleteController = new FeedsDeleteController(deleteHandler);

const findController = new FeedsFindController(findHandler);

const searchController = new FeedsSearchController(searchHandler);

const updateController = new FeedsUpdateController(updateHandler);

const trendsController = new TrendsController(trendsSearchHandler);

export {
  mapper as feedMapper,
  createController as feedsCreateController,
  deleteController as feedsDeleteController,
  findController as feedsFindController,
  searchController as feedsSearchController,
  updateController as feedsUpdateController,
  trendsController,
};

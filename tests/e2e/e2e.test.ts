import * as nock from 'nock';

import { feedRoute } from '../../src/feeds/infrastructure/routers';
import { App } from '../../src/shared/infrastructure/app';
import {
  config,
  TConfig,
} from '../../src/shared/infrastructure/configs/config';
import { connectors } from '../../src/shared/infrastructure/configs/connectors';
import { feedCreateTest } from './feeds/create';
import { feedDeleteTest } from './feeds/delete';
import { feedFindTest } from './feeds/find';
import { feedSearchTest } from './feeds/search';
import { trendsTest } from './feeds/trends';
import { feedUpdateTest } from './feeds/update';

describe('API - Test', () => {
  const testConfig: TConfig = {
    ...config,
    server: {
      ...config.server,
      port: Number(process.env.TEST_PORT) || 3001,
    },
  };

  const app = new App(testConfig);

  beforeAll(async () => {
    app.addRoutes(feedRoute);
    app.addConnector(...connectors);
    await app.start();
    nock.disableNetConnect();
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  afterAll(async () => {
    await app.stop();
    nock.enableNetConnect();
  });

  feedCreateTest(app);
  feedFindTest(app);
  feedDeleteTest(app);
  feedSearchTest(app);
  feedUpdateTest(app);

  trendsTest(app);
});

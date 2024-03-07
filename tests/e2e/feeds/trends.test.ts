import * as nock from 'nock';
import request from 'supertest';

import { TFeedDto } from '../../../src/feeds/domain/types';
import { feedRoute } from '../../../src/feeds/infrastructure/routers';
import { App } from '../../../src/shared/infrastructure/app';
import {
  config,
  TConfig,
} from '../../../src/shared/infrastructure/configs/config';
import { connectors } from '../../../src/shared/infrastructure/configs/connectors';

describe('Feeds API - Trends', () => {
  let app: App;

  const testConfig: TConfig = {
    ...config,
    server: {
      ...config.server,
      port: 3005,
    },
  };

  beforeAll(async () => {
    app = new App(testConfig);
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

  it('update feeds', async () => {
    const response = await request(app.server()!)
      .get(`/feeds/trends`)
      .expect(200);

    const data: TFeedDto[] = response.body?.data;

    expect(Array.isArray(data)).toBe(true);
  });
});

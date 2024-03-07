import * as nock from 'nock';
import request from 'supertest';

import { feedRoute } from '../../../src/feeds/infrastructure/routers';
import { TPagination } from '../../../src/shared/domain/contracts/app.contract';
import { App } from '../../../src/shared/infrastructure/app';
import {
  config,
  TConfig,
} from '../../../src/shared/infrastructure/configs/config';
import { connectors } from '../../../src/shared/infrastructure/configs/connectors';

describe('Feeds API - Search', () => {
  let app: App;

  const testConfig: TConfig = {
    ...config,
    server: {
      ...config.server,
      port: 3004,
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

  it('search feeds', async () => {
    const response = await request(app.server()!).get('/feeds').expect(200);

    const data = response.body?.data;

    expect(data).toBeDefined();

    expect(data.meta).toBeDefined();

    const pagination: TPagination = data.meta;

    expect(Array.isArray(data.items)).toBe(true);

    expect(pagination.items).toBeDefined();
    expect(typeof pagination.items.count === 'number').toBe(true);
    expect(typeof pagination.items.total === 'number').toBe(true);

    expect(pagination.pages).toBeDefined();
    expect(typeof pagination.pages.current === 'number').toBe(true);
    expect(typeof pagination.pages.total === 'number').toBe(true);
  });
});

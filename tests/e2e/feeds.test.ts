import request from 'supertest';

import { feedRoute } from '../../src/feeds/infrastructure/routers';
import { App } from '../../src/shared/infrastructure/app';
import {
  config,
  TConfig,
} from '../../src/shared/infrastructure/configs/config';
import { connectors } from '../../src/shared/infrastructure/configs/connectors';

describe('Feeds API', () => {
  let app: App;

  const testConfig: TConfig = {
    ...config,
    server: {
      ...config.server,
      port: 3001,
    },
  };

  beforeAll(async () => {
    app = new App(testConfig);
    app.addRoutes(feedRoute);
    app.addConnector(...connectors);
    await app.start();
  });

  afterAll(async () => {
    await app.stop();
  });

  it('search feeds', async () => {
    const response = await request(app.server()!).get('/feeds');

    expect(response.status).toBe(200);
  });
});

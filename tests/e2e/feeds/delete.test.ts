import * as nock from 'nock';
import request from 'supertest';

import { TFeedDto } from '../../../src/feeds/domain/types';
import { FeedModel } from '../../../src/feeds/infrastructure/models';
import { feedRoute } from '../../../src/feeds/infrastructure/routers';
import { App } from '../../../src/shared/infrastructure/app';
import {
  config,
  TConfig,
} from '../../../src/shared/infrastructure/configs/config';
import { connectors } from '../../../src/shared/infrastructure/configs/connectors';
import { FeedEntityMother } from '../../feeds/domain/mothers/entity.mother';

describe('Feeds API - Delete', () => {
  let app: App;

  const feedDto: TFeedDto = FeedEntityMother.createFromLocal().toPrimitive();

  const testConfig: TConfig = {
    ...config,
    server: {
      ...config.server,
      port: 3002,
    },
  };

  beforeAll(async () => {
    app = new App(testConfig);
    app.addRoutes(feedRoute);
    app.addConnector(...connectors);
    await app.start();
    nock.disableNetConnect();
    nock.enableNetConnect();

    await FeedModel.create(feedDto);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  afterAll(async () => {
    await app.stop();
    nock.enableNetConnect();
  });

  it('update feeds', async () => {
    await request(app.server()!).delete(`/feeds/${feedDto.uuid}`).expect(204);
  });
});

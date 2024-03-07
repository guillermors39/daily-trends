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

describe('Feeds API - Find', () => {
  let app: App;

  const feedDto: TFeedDto = FeedEntityMother.createFromLocal().toPrimitive();

  const testConfig: TConfig = {
    ...config,
    server: {
      ...config.server,
      port: 3003,
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
    const response = await request(app.server()!)
      .get(`/feeds/${feedDto.uuid}`)
      .expect(200);

    const data = response.body?.data;

    expect(data).toBeDefined();

    expect(data.uuid).toBe(feedDto.uuid);

    expect(typeof data.source === 'object').toBe(true);

    expect(data.source.code).toBe(feedDto.source.code);
    expect(data.source.url).toBe(feedDto.source.url);
    expect(data.body).toBe(feedDto.body);

    expect(Array.isArray(data.authors)).toBe(true);
    expect(feedDto.authors.every((item) => data.authors.includes(item))).toBe(
      true,
    );

    expect(data.date).toBe(feedDto.date.toISOString());
  });
});

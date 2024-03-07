import * as nock from 'nock';
import request from 'supertest';

import { FeedEntity } from '../../../src/feeds/domain/entities';
import { TFeedDto } from '../../../src/feeds/domain/types';
import { FeedModel } from '../../../src/feeds/infrastructure/models';
import { feedRoute } from '../../../src/feeds/infrastructure/routers';
import { App } from '../../../src/shared/infrastructure/app';
import {
  config,
  TConfig,
} from '../../../src/shared/infrastructure/configs/config';
import { connectors } from '../../../src/shared/infrastructure/configs/connectors';
import { FeedCreateMother } from '../../feeds/domain/mothers/create.mother';
import { FeedEntityMother } from '../../feeds/domain/mothers/entity.mother';

describe('Feeds API - Create', () => {
  let app: App;

  const feedDto = FeedEntityMother.createFromLocal().toPrimitive();

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

  it('should create and return feeds', async () => {
    const feedCreate = FeedCreateMother.create();
    const response = await request(app.server()!)
      .post('/feeds')
      .send(feedCreate)
      .expect(200);

    const feed: TFeedDto = response.body?.data;

    expect(feed).toBeDefined();

    const expectedDto = FeedEntity.create(feed.uuid, feedCreate).toPrimitive();

    expect(typeof feed.uuid === 'string').toBe(true);
    expect(typeof feed.source === 'object').toBe(true);

    expect(feed.source.code).toBe(expectedDto.source.code);
    expect(feed.source.url).toBe(expectedDto.source.url);
    expect(feed.body).toBe(expectedDto.body);

    expect(Array.isArray(feed.authors)).toBe(true);
    expect(
      expectedDto.authors.every((item) => feed.authors.includes(item)),
    ).toBe(true);

    expect(feed.date).toBe(expectedDto.date.toISOString());
  });

  it('should be throw title already exists', async () => {
    const feedCreate = FeedCreateMother.create({ title: feedDto.title });

    const response = await request(app.server()!)
      .post('/feeds')
      .send(feedCreate)
      .expect(422);

    expect(response.body.error).toBeDefined();
  });
});

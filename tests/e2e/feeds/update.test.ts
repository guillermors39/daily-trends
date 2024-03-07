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

describe('Feeds API - Update', () => {
  let app: App;

  const feedDto: TFeedDto = FeedEntityMother.createFromLocal().toPrimitive();

  const testConfig: TConfig = {
    ...config,
    server: {
      ...config.server,
      port: 3006,
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
    const feedUpdateDto = FeedCreateMother.create();

    const response = await request(app.server()!)
      .put(`/feeds/${feedDto.uuid}`)
      .send(feedUpdateDto)
      .expect(200);

    const data: TFeedDto = response.body?.data;

    expect(data).toBeDefined();

    const expectedDto = FeedEntity.create(
      feedDto.uuid,
      feedUpdateDto,
    ).toPrimitive();

    expect(data.uuid).toBe(expectedDto.uuid);

    expect(typeof data.source === 'object').toBe(true);

    expect(data.source.code).toBe(expectedDto.source.code);
    expect(data.source.url).toBe(expectedDto.source.url);
    expect(data.body).toBe(feedUpdateDto.body);

    expect(Array.isArray(data.authors)).toBe(true);
    expect(
      expectedDto.authors.every((item) => data.authors.includes(item)),
    ).toBe(true);

    expect(data.date).toBe(expectedDto.date.toISOString());
  });
});

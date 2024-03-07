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
import { UuidBuilder } from '../../shared/domain/builders/uuid.builder';

describe('Feeds API - Delete', () => {
  let app: App;

  const feedDto: TFeedDto = FeedEntityMother.createFromLocal().toPrimitive();

  const feedExternalDto: TFeedDto =
    FeedEntityMother.createFromExternal().toPrimitive();

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

    await FeedModel.create(feedDto, feedExternalDto);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  afterAll(async () => {
    await app.stop();
    nock.enableNetConnect();
  });

  it('should delete feeds', async () => {
    await request(app.server()!).delete(`/feeds/${feedDto.uuid}`).expect(204);
  });

  it('should throw not found', async () => {
    const uuid = UuidBuilder.random();

    const response = await request(app.server()!)
      .delete(`/feeds/${uuid}`)
      .expect(404);

    expect(response.body.error).toBeDefined();
  });

  it('should throw cannot modify external', async () => {
    const response = await request(app.server()!)
      .delete(`/feeds/${feedExternalDto.uuid}`)
      .expect(422);

    expect(response.body.error).toBeDefined();
  });
});

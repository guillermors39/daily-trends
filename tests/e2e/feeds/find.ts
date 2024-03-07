import request from 'supertest';

import { TFeedDto } from '../../../src/feeds/domain/types';
import { FeedModel } from '../../../src/feeds/infrastructure/models';
import { App } from '../../../src/shared/infrastructure/app';
import { FeedEntityMother } from '../../feeds/domain/mothers/entity.mother';
import { UuidBuilder } from '../../shared/domain/builders/uuid.builder';

export const feedFindTest = (app: App) =>
  describe('Feeds API - Find', () => {
    const feedDto: TFeedDto = FeedEntityMother.createFromLocal().toPrimitive();

    beforeAll(async () => {
      await FeedModel.create(feedDto);
    });

    afterAll(async () => {
      await FeedModel.deleteOne({ uuid: feedDto.uuid });
    });

    it('should return feed', async () => {
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

    it('should return not found', async () => {
      const uuid = UuidBuilder.random();

      const response = await request(app.server()!)
        .get(`/feeds/${uuid}`)
        .expect(404);

      expect(response.body.error).toBeDefined();
    });
  });

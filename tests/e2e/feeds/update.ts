import request from 'supertest';

import { FeedEntity } from '../../../src/feeds/domain/entities';
import { TFeedDto } from '../../../src/feeds/domain/types';
import { FeedModel } from '../../../src/feeds/infrastructure/models';
import { App } from '../../../src/shared/infrastructure/app';
import { FeedCreateMother } from '../../feeds/domain/mothers/create.mother';
import { FeedEntityMother } from '../../feeds/domain/mothers/entity.mother';
import { UuidBuilder } from '../../shared/domain/builders/uuid.builder';

export const feedUpdateTest = (app: App) =>
  describe('Feeds API - Update', () => {
    const feedDto: TFeedDto = FeedEntityMother.createFromLocal().toPrimitive();

    const feedExternalDto: TFeedDto =
      FeedEntityMother.createFromExternal().toPrimitive();

    const feedLocalDto: TFeedDto =
      FeedEntityMother.createFromLocal().toPrimitive();

    beforeAll(async () => {
      await FeedModel.create(feedDto, feedExternalDto, feedLocalDto);
    });

    afterAll(async () => {
      await FeedModel.deleteMany({
        uuid: { $in: [feedDto.uuid, feedExternalDto.uuid, feedLocalDto.uuid] },
      });
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

    it('should throw not found', async () => {
      const uuid = UuidBuilder.random();

      const feedUpdateDto = FeedCreateMother.create();

      const response = await request(app.server()!)
        .put(`/feeds/${uuid}`)
        .send(feedUpdateDto)
        .expect(404);

      expect(response.body.error).toBeDefined();
    });

    it('should be throw title already exists', async () => {
      const feedUpdateDto = FeedCreateMother.create({
        title: feedLocalDto.title,
      });

      const response = await request(app.server()!)
        .put(`/feeds/${feedDto.uuid}`)
        .send(feedUpdateDto)
        .expect(422);

      expect(response.body.error).toBeDefined();
    });

    it('should throw cannot modify external', async () => {
      const feedUpdateDto = FeedCreateMother.create();

      const response = await request(app.server()!)
        .put(`/feeds/${feedExternalDto.uuid}`)
        .send(feedUpdateDto)
        .expect(422);

      expect(response.body.error).toBeDefined();
    });
  });

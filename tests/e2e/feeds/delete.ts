import request from 'supertest';

import { TFeedDto } from '../../../src/feeds/domain/types';
import { FeedModel } from '../../../src/feeds/infrastructure/models';
import { App } from '../../../src/shared/infrastructure/app';
import { FeedEntityMother } from '../../feeds/domain/mothers/entity.mother';
import { UuidBuilder } from '../../shared/domain/builders/uuid.builder';

export const feedDeleteTest = (app: App) =>
  describe('Feeds API - Delete', () => {
    const feedDto: TFeedDto = FeedEntityMother.createFromLocal().toPrimitive();

    const feedExternalDto: TFeedDto =
      FeedEntityMother.createFromExternal().toPrimitive();

    beforeAll(async () => {
      await FeedModel.create(feedDto, feedExternalDto);
    });

    afterAll(async () => {
      await FeedModel.deleteMany({ uuid: { $in: [feedExternalDto.uuid] } });
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

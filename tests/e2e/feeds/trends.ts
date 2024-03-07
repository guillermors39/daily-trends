import request from 'supertest';

import { TFeedDto } from '../../../src/feeds/domain/types';
import { FeedModel } from '../../../src/feeds/infrastructure/models';
import { TUuid } from '../../../src/shared/domain/types';
import { App } from '../../../src/shared/infrastructure/app';

export const trendsTest = (app: App) =>
  describe('Feeds API - Trends', () => {
    const uuids: TUuid[] = [];

    afterAll(async () => {
      await FeedModel.deleteMany({ uuid: { $in: uuids } });
    });

    it('update feeds', async () => {
      const response = await request(app.server()!)
        .get(`/feeds/trends`)
        .expect(200);

      const data: TFeedDto[] = response.body?.data;

      expect(Array.isArray(data)).toBe(true);

      uuids.push(...data.map((item) => item.uuid));
    });
  });

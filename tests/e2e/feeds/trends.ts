import request from 'supertest';

import { TFeedDto } from '../../../src/feeds/domain/types';
import { App } from '../../../src/shared/infrastructure/app';

export const trendsTest = (app: App) =>
  describe('Feeds API - Trends', () => {
    it('update feeds', async () => {
      const response = await request(app.server()!)
        .get(`/feeds/trends`)
        .expect(200);

      const data: TFeedDto[] = response.body?.data;

      expect(Array.isArray(data)).toBe(true);
    });
  });

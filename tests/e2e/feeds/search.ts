import request from 'supertest';

import { TPagination } from '../../../src/shared/domain/contracts/app.contract';
import { App } from '../../../src/shared/infrastructure/app';

export const feedSearchTest = (app: App) =>
  describe('Feeds API - Search', () => {
    it('search feeds', async () => {
      const response = await request(app.server()!).get('/feeds').expect(200);

      const data = response.body?.data;

      expect(data).toBeDefined();

      expect(data.meta).toBeDefined();

      const pagination: TPagination = data.meta;

      expect(Array.isArray(data.items)).toBe(true);

      expect(pagination.items).toBeDefined();
      expect(typeof pagination.items.count === 'number').toBe(true);
      expect(typeof pagination.items.total === 'number').toBe(true);

      expect(pagination.pages).toBeDefined();
      expect(typeof pagination.pages.current === 'number').toBe(true);
      expect(typeof pagination.pages.total === 'number').toBe(true);
    });
  });

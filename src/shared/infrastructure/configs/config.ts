import { config as configDotEnv } from 'dotenv';

import { ESourceCode } from '../../../feeds/domain/enums';

configDotEnv();

export const config = {
  server: {
    port: Number(process.env.PORT) || 3000,
    tz: process.env.TZ || 'UTC',
  },
  env: process.env.NODE_ENV || 'production',
  database: {
    host: process.env.DB_HOST || 'db',
    port: Number(process.env.DB_PORT) || 27017,
    user: process.env.DB_USERNAME || 'feed',
    password: process.env.DB_PASSWORD || 'secret',
    name: process.env.DB_NAME || 'challenge',
  },
  scraping: {
    limit: 5,
    portals: {
      [ESourceCode.elMundo]: 'https://www.elmundo.es/',
      [ESourceCode.elPais]: 'https://elpais.com/',
    },
  },
};

export type TConfig = typeof config;

export type TConfigDb = {
  readonly host: string;
  readonly port: number;
  readonly user?: string;
  readonly password?: string;
  readonly name?: string;
};

type TNewsPortalConfig = Partial<Record<ESourceCode, string>>;

export type TScrapingConfig = {
  readonly limit: number;
  readonly portals: TNewsPortalConfig;
};

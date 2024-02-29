import { config as configDotEnv } from 'dotenv';

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
};

export type TConfig = typeof config;
export type TConfigDb = TConfig['database'];

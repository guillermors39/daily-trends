import { connect } from 'mongoose';

import { TConfigDb } from '../configs';

export class MongooseConnectorService {
  private static instance: MongooseConnectorService;

  private constructor() {}

  public static getInstance(): MongooseConnectorService {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  private uri({ host, port, user, password }: TConfigDb): string {
    return `mongodb://${user}:${password}@${host}:${port}`;
  }

  async connect(config: TConfigDb): Promise<void> {
    const { name: dbName } = config;

    try {
      await connect(this.uri(config), { dbName });
    } catch (error) {
      console.error(error);
    }
  }
}

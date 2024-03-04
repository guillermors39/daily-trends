import { connect, Mongoose } from 'mongoose';

import { TConfigDb } from '../configs';
import { IConnector } from '../contracts';

const uri = ({ host, port, user, password }: TConfigDb): string => {
  let userUri = '';

  if (!!user && !!password) {
    userUri += `${user}:${password}@`;
  }

  return `mongodb://${userUri}${host}:${port}`;
};

export class MongooseConnectorService implements IConnector {
  private client: Mongoose | undefined;

  constructor(private readonly config: TConfigDb) {}

  async connect(): Promise<void> {
    this.client = await connect(uri(this.config), { dbName: this.config.name });
  }

  async disconnect(): Promise<void> {
    if (!!this.client) {
      return this.client.disconnect();
    }
  }
}

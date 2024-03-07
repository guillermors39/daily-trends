import { config } from '../../../../src/shared/infrastructure/configs/config';
import { MongooseConnectorService } from '../../../../src/shared/infrastructure/services/mongoose.service';

describe('MongooseConnectorService', () => {
  let connector: MongooseConnectorService;

  beforeAll(async () => {
    connector = new MongooseConnectorService(config.database);
  });

  it('should be connected', async () => {
    await expect(connector.connect()).resolves.toBeUndefined();
  });

  it('should be disconnected', async () => {
    await connector.connect();

    expect(connector.disconnect()).resolves.toBeUndefined();
  });

  afterAll(async () => {
    await connector.disconnect();
  });
});

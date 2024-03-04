import { IConnector } from '../contracts';
import { MongooseConnectorService } from '../services/mongoose.service';
import { config } from './config';

const mongoConnector = new MongooseConnectorService(config.database);

export const connectors: IConnector[] = [mongoConnector];

import express, { Express } from 'express';

import { TConfig } from './configs';
import errorHandlerMiddleware from './middlewares/error-handler.middleware';
import { MongooseConnectorService } from './services/mongoose.service';
import { TRoute } from './types';

export class App {
  private readonly port: number;
  private readonly express: Express;

  private routes: TRoute[] = [];

  constructor(private readonly config: TConfig) {
    this.port = this.config.server.port;
    this.express = express();
  }

  async start(): Promise<void> {
    this.setMiddlewares();

    this.setRoutes();

    await this.database();

    this.setErrorHandler();

    this.express.listen(this.port, () => {
      console.log(`[APP] - Starting application on port: ${this.port}`);
    });
  }

  addRoutes(routes: TRoute[]) {
    this.routes.push(...routes);
  }

  private async database() {
    await MongooseConnectorService.getInstance().connect(this.config.database);
  }

  private setMiddlewares() {
    this.express.use(express.json());
  }

  private setErrorHandler() {
    this.express.use(errorHandlerMiddleware);
  }

  private setRoutes() {
    this.routes.forEach((route: TRoute) => {
      this.express.use(route.uri, route.router);
    });
  }
}

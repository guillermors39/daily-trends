import express, { Express } from 'express';

import { TConfig } from './configs';
import { IConnector } from './contracts';
import errorHandlerMiddleware from './middlewares/error-handler.middleware';
import { TRoute } from './types';

export class App {
  private readonly port: number;
  private readonly express: Express;

  private routes: TRoute[] = [];
  private connectors: IConnector[] = [];

  constructor(private readonly config: TConfig) {
    this.port = this.config.server.port;
    this.express = express();
  }

  async start(): Promise<void> {
    this.setMiddlewares();

    this.setRoutes();

    await this.connections();

    this.setErrorHandler();

    this.express.listen(this.port, () => {
      console.log(`[APP] - Starting application on port: ${this.port}`);
    });
  }

  addRoutes(routes: TRoute[]) {
    this.routes.push(...routes);
  }

  addConnector(...connectors: IConnector[]) {
    this.connectors.push(...connectors);
  }

  private async connections() {
    const promises = this.connectors.map((item: IConnector) => item.connect());

    await Promise.all(promises);
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

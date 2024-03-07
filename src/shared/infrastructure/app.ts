import http from 'node:http';

import express, { Express } from 'express';

import { TConfig } from './configs/config';
import { IConnector } from './contracts';
import errorHandlerMiddleware from './middlewares/error-handler.middleware';
import { TRoute } from './types';

export class App {
  private readonly port: number;
  private readonly express: Express;
  private httpServer?: http.Server;

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
    this.httpServer = this.express.listen(this.port, () => {
      console.info(`[APP] - Starting application on port: ${this.port}`);
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }

  addRoutes(...routes: TRoute[]) {
    this.routes.push(...routes);
  }

  addConnector(...connectors: IConnector[]) {
    this.connectors.push(...connectors);
  }

  server(): http.Server | undefined {
    return this.httpServer;
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

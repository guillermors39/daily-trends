import { App } from './shared/infrastructure/app';
import { config, connectors, routes } from './shared/infrastructure/configs';

async function bootstrap() {
  const app = new App(config);

  app.addRoutes(routes);

  app.addConnector(...connectors);

  app.start();
}

bootstrap();

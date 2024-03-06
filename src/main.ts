import { App } from './shared/infrastructure/app';
import { config } from './shared/infrastructure/configs/config';
import { connectors } from './shared/infrastructure/configs/connectors';
import { routes } from './shared/infrastructure/configs/route';

async function bootstrap() {
  const app = new App(config);

  app.addRoutes(routes);

  app.addConnector(...connectors);

  app.start();
}

bootstrap();

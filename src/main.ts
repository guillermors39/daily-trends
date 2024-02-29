import { App } from './shared/infrastructure/app';
import { config, routes } from './shared/infrastructure/configs';

async function bootstrap() {
  const app = new App(config);

  app.addRoutes(routes);

  app.start();
}

bootstrap();

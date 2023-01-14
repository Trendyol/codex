import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  useHelmet(app);
  useCompression(app);
  useGlobalPipes(app);
  setupSwagger(app);
  enableCors(app);

  await app.listen(4000);
};

const useHelmet = (app: INestApplication) => {
  app.use(helmet());
};

const useGlobalPipes = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe());
};

const useCompression = (app: INestApplication) => {
  app.use(compression());
};

const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Codex API')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });

  SwaggerModule.setup('api', app, document, {
    explorer: true,
  });
};

const enableCors = (app: INestApplication) => {
  app.enableCors();
};

bootstrap();

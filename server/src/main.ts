import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  useHelmet(app);
  useCompression(app);
  useGlobalPipes(app);
  useCookie(app);
  setupSwagger(app);
  enableCors(app);

  await app.listen(configService.get('PORT'));
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
  const config = new DocumentBuilder().setTitle('Codex API').setVersion('0.1').build();

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

const useCookie = (app: INestApplication) => {
  app.use(cookieParser());
};

bootstrap();

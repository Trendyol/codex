import config from '@core/config/configuration';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import helmet from 'helmet';
import * as http from 'http';
import { ExpressPeerServer } from 'peer';

import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  useHelmet(app);
  useCompression(app);
  useGlobalPipes(app);
  useCookie(app);
  setupSwagger(app);
  enableCors(app);

  const peerServer = createPeerServer();
  peerServer.listen(config.ports.peer, () => {
    Logger.log(`Peer Server listening on ${config.ports.peer}`);
  });

  await app.listen(config.ports.app, () => {
    Logger.log(`Nest Application Server listening on ${config.ports.app}`);
  });
};

const createPeerServer = () => {
  const app = express();
  const server = http.createServer(app);
  const peerServer = ExpressPeerServer(server, {
    path: '/',
  });
  app.use('/peerjs', peerServer);
  return server;
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
  app.enableCors({
    origin: config.clientUrl,
    credentials: true,
  });
};

const useCookie = (app: INestApplication) => {
  app.use(cookieParser());
};

bootstrap();

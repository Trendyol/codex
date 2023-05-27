import config from '@core/config/configuration';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import helmet from 'helmet';
import * as http from 'http';
import { Socket } from 'net';
import { ExpressPeerServer } from 'peer';
import { Server as WebSocketServer } from 'ws';
import { setupWSConnection } from 'y-websocket/bin/utils';

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

  const monacoSyncServer = createMonacoSyncServer(app);
  monacoSyncServer.listen(config.ports.monacoSync, () => {
    Logger.log(`Monaco Sync Server listening on ${config.ports.monacoSync}`);
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

const createMonacoSyncServer = (app: INestApplication) => {
  const server = http.createServer(app.getHttpServer());
  const wss = new WebSocketServer({ noServer: true });
  wss.on('connection', setupWSConnection);
  server.on('upgrade', (request, socket, head) => {
    const handleAuth = (ws) => {
      wss.emit('connection', ws, request);
    };
    wss.handleUpgrade(request, socket as Socket, head, handleAuth);
  });
  return server;
};

const useHelmet = (app: INestApplication) => {
  app.use(helmet());
};

const useGlobalPipes = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }),
  );
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
    origin: [...config.allowedOrigins],
    credentials: true,
  });
};

const useCookie = (app: INestApplication) => {
  app.use(cookieParser());
};

bootstrap();

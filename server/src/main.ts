import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  useGlobalPipes(app);
  useHelmet(app);

  await app.listen(4000);
};

const useGlobalPipes = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe());
};

const useHelmet = (app: INestApplication) => {
  app.use(helmet());
};

bootstrap();

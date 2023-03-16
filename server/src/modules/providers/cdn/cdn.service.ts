import config from '@core/config/configuration';
import { IStorageService } from '@core/data/services/storage.service';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as cdn from '@trendyol-js/cdn';
import { unlinkSync } from 'fs';

@Injectable()
export class CdnStorageService implements IStorageService, OnModuleInit {
  options = {
    environment: config.storage.cdn.environment,
    team: config.storage.cdn.team,
    secret: config.storage.cdn.secret,
    path: config.storage.cdn.path,
  };
  async upload(fileName: string, sourcePath: string) {
    const item = await cdn.item({ sourcePath, ...this.options });
    await cdn.upload(item);
    unlinkSync(sourcePath);

    return this.options.path + fileName;
  }

  async onModuleInit() {
    const secret = config.storage.cdn.secret;
    try {
      await cdn.authorize(secret);
    } catch (error) {
      Logger.error('Error connecting to CDN Storage', error);
    }
  }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelTypes, Ottoman } from 'ottoman';

import { User, userSchema } from './schemas/user.schema';

@Injectable()
export class OttomanService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  UserModel: ModelTypes<User, User>;
  
  onModuleInit() {
    const ottoman = new Ottoman({ collectionName: '_default', modelKey: 'type' });

    const connectionString = this.configService.get('CB_CONNECTION_STRING');
    const bucketName = this.configService.get('CB_BUCKET_NAME');
    const username = this.configService.get('CB_USERNAME');
    const password = this.configService.get('CB_PASSWORD');

    ottoman.connect({
      connectionString,
      bucketName,
      username,
      password,
    });

    this.UserModel = ottoman.model<User, User>('user', userSchema);
  }
}

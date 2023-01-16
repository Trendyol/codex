import { Submission, User } from '@core/data/entities';
import { IDataServices } from '@core/data/services/data.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Ottoman } from 'ottoman';

import { Document, OttomanGenericRepository } from './ottoman.repo';
import { submissionSchema } from './schemas/submission.schema';
import { userSchema } from './schemas/user.schema';

@Injectable()
export class OttomanDataServices extends IDataServices implements OnModuleInit {
  connection: any;
  users: OttomanGenericRepository<User>;
  submissions: OttomanGenericRepository<Submission>;

  constructor(private readonly configService: ConfigService) {
    super();
  }

  async onModuleInit() {
    const ottoman = new Ottoman({
      collectionName: '_default',
      modelKey: 'type',
    });

    const connectionString = this.configService.get('CB_CONNECTION_STRING');
    const bucketName = this.configService.get('CB_BUCKET_NAME');
    const username = this.configService.get('CB_USERNAME');
    const password = this.configService.get('CB_PASSWORD');

    this.connection = await ottoman.connect({
      connectionString,
      bucketName,
      username,
      password,
    });

    const userModel = ottoman.model<User, Document<User>>('user', userSchema);
    this.users = new OttomanGenericRepository<User>(userModel);
    const submissionModel = ottoman.model<Submission, Document<Submission>>(
      'submission',
      submissionSchema,
    );
    this.submissions = new OttomanGenericRepository<Submission>(
      submissionModel,
    );
  }
}

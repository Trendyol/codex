import config from '@core/config/configuration';
import { SubmissionEntity, UserEntity } from '@core/data/entities';
import { IDataService } from '@core/data/services/data.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Ottoman } from 'ottoman';

import { Document, OttomanGenericRepository } from './ottoman.repository';
import { submissionSchema } from './schemas/submission.schema';
import { userSchema } from './schemas/user.schema';

@Injectable()
export class OttomanDataService implements IDataService, OnModuleInit {
  users: OttomanGenericRepository<UserEntity>;
  submissions: OttomanGenericRepository<SubmissionEntity>;

  async onModuleInit() {
    const ottoman = new Ottoman({
      collectionName: '_default',
      modelKey: 'type',
    });

    const connectionString = config.couchbase.connectionString;
    const bucketName = config.couchbase.bucketName;
    const username = config.couchbase.username;
    const password = config.couchbase.password;

    await ottoman.connect({
      connectionString,
      bucketName,
      username,
      password,
    });

    const userModel = ottoman.model<UserEntity, Document<UserEntity>>(
      'user',
      userSchema,
    );
    this.users = new OttomanGenericRepository<UserEntity>(userModel);

    const submissionModel = ottoman.model<
      SubmissionEntity,
      Document<SubmissionEntity>
    >('submission', submissionSchema);
    this.submissions = new OttomanGenericRepository<SubmissionEntity>(
      submissionModel,
    );
  }
}

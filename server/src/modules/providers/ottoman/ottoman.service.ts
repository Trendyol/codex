import config from '@core/config/configuration';
import { SubmissionEntity, UserEntity } from '@core/data/entities';
import { ContestEntity } from '@core/data/entities/contest.entity';
import { TeamEntity } from '@core/data/entities/team.entity';
import { IDataService } from '@core/data/services/data.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Ottoman } from 'ottoman';

import { Document, OttomanGenericRepository } from './ottoman.repository';
import { contestSchema } from './schemas/contest.schema';
import { submissionSchema } from './schemas/submission.schema';
import { teamSchema } from './schemas/team.schema';
import { userSchema } from './schemas/user.schema';

@Injectable()
export class OttomanDataService implements IDataService, OnModuleInit {
  users: OttomanGenericRepository<UserEntity>;
  submissions: OttomanGenericRepository<SubmissionEntity>;
  contests: OttomanGenericRepository<ContestEntity>;
  teams: OttomanGenericRepository<TeamEntity>;

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

    const contestModel = ottoman.model<ContestEntity, Document<ContestEntity>>(
      'contest',
      contestSchema,
    );
    this.contests = new OttomanGenericRepository<ContestEntity>(contestModel);

    const teamModel = ottoman.model<TeamEntity, Document<TeamEntity>>(
      'team',
      teamSchema,
    );
    this.teams = new OttomanGenericRepository<TeamEntity>(teamModel);
  }
}

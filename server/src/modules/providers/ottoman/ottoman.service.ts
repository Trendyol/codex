import config from '@core/config/configuration';
import { SubmissionEntity, UserEntity } from '@core/data/entities';
import { ChallengeEntity } from '@core/data/entities/challenge.entity';
import { TeamEntity } from '@core/data/entities/team.entity';
import { IDataService } from '@core/data/services/data.service';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Ottoman } from 'ottoman';

import { Document, OttomanGenericRepository } from './ottoman.repository';
import { challengeSchema } from './schemas/challenge.schema';
import { submissionSchema } from './schemas/submission.schema';
import { teamSchema } from './schemas/team.schema';
import { userSchema } from './schemas/user.schema';

@Injectable()
export class OttomanDataService implements IDataService, OnModuleInit {
  users: OttomanGenericRepository<UserEntity>;
  submissions: OttomanGenericRepository<SubmissionEntity>;
  challenges: OttomanGenericRepository<ChallengeEntity>;
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

    try {
      await ottoman.connect({
        connectionString,
        bucketName,
        username,
        password,
      });
    } catch (error) {
      Logger.error('Error connecting to Couchbase', error);
    }

    const userModel = ottoman.model<UserEntity, Document<UserEntity>>('user', userSchema);
    this.users = new OttomanGenericRepository<UserEntity>(userModel);

    const submissionModel = ottoman.model<SubmissionEntity, Document<SubmissionEntity>>(
      'submission',
      submissionSchema,
    );
    this.submissions = new OttomanGenericRepository<SubmissionEntity>(submissionModel);

    const challengeModel = ottoman.model<ChallengeEntity, Document<ChallengeEntity>>(
      'challenge',
      challengeSchema,
    );
    this.challenges = new OttomanGenericRepository<ChallengeEntity>(challengeModel);

    const teamModel = ottoman.model<TeamEntity, Document<TeamEntity>>('team', teamSchema);
    this.teams = new OttomanGenericRepository<TeamEntity>(teamModel);
  }
}

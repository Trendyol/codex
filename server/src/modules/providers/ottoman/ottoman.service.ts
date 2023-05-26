import config from '@core/config/configuration';
import { SubmissionEntity, UserEntity } from '@core/data/entities';
import { ChallengeEntity } from '@core/data/entities/challenge.entity';
import { ProblemEntity } from '@core/data/entities/problem.entity';
import {
  ArticleEntity,
  CommentEntity,
  DiscussionEntity,
} from '@core/data/entities/publication.entity';
import { TeamEntity } from '@core/data/entities/team.entity';
import { TestcaseEntity } from '@core/data/entities/testcase.entity';
import { IDataService } from '@core/data/services/data.service';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Ottoman } from 'ottoman';

import { OttomanQueries } from './ottoman.queries';
import { Document, OttomanGenericRepository } from './ottoman.repository';
import { challengeSchema } from './schemas/challenge.schema';
import { problemSchema } from './schemas/problem.schema';
import { articleSchema, commentSchema, discussionSchema } from './schemas/publication.schema';
import { submissionSchema } from './schemas/submission.schema';
import { teamSchema } from './schemas/team.schema';
import { testcaseSchema } from './schemas/testcase.schema';
import { userSchema } from './schemas/user.schema';

@Injectable()
export class OttomanDataService implements IDataService, OnModuleInit {
  users: OttomanGenericRepository<UserEntity>;
  submissions: OttomanGenericRepository<SubmissionEntity>;
  challenges: OttomanGenericRepository<ChallengeEntity>;
  teams: OttomanGenericRepository<TeamEntity>;
  problems: OttomanGenericRepository<ProblemEntity>;
  testcases: OttomanGenericRepository<TestcaseEntity>;
  queries: OttomanQueries;
  articles: OttomanGenericRepository<ArticleEntity>;
  discussions: OttomanGenericRepository<DiscussionEntity>;
  comments: OttomanGenericRepository<CommentEntity>;

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

    this.queries = new OttomanQueries(ottoman.query.bind(ottoman));

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

    const problemModel = ottoman.model<ProblemEntity, Document<ProblemEntity>>(
      'problem',
      problemSchema,
    );
    this.problems = new OttomanGenericRepository<ProblemEntity>(problemModel);

    const testcaseModel = ottoman.model<TestcaseEntity, Document<TestcaseEntity>>(
      'testcase',
      testcaseSchema,
    );
    this.testcases = new OttomanGenericRepository<TestcaseEntity>(testcaseModel);

    const articleModel = ottoman.model<ArticleEntity, Document<ArticleEntity>>(
      'article',
      articleSchema,
    );
    this.articles = new OttomanGenericRepository<ArticleEntity>(articleModel);

    const discussionModel = ottoman.model<DiscussionEntity, Document<DiscussionEntity>>(
      'discussion',
      discussionSchema,
    );
    this.discussions = new OttomanGenericRepository<DiscussionEntity>(discussionModel);

    const commentModel = ottoman.model<CommentEntity, Document<CommentEntity>>(
      'comment',
      commentSchema,
    );
    this.comments = new OttomanGenericRepository<CommentEntity>(commentModel);
  }
}

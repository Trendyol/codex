import { OttomanQueries } from '@ottoman/ottoman.queries';

import { SubmissionEntity } from '../entities';
import { ChallengeEntity } from '../entities/challenge.entity';
import { ProblemEntity } from '../entities/problem.entity';
import { ArticleEntity, CommentEntity, DiscussionEntity } from '../entities/publication.entity';
import { TeamEntity } from '../entities/team.entity';
import { TestcaseEntity } from '../entities/testcase.entity';
import { UserEntity } from '../entities/user.entity';
import { IGenericRepository } from '../repositories/generic.repository';

type Pure<T> = Omit<T, 'id'>;

export abstract class IDataService {
  abstract users: IGenericRepository<Pure<UserEntity>, UserEntity>;
  abstract submissions: IGenericRepository<Pure<SubmissionEntity>, SubmissionEntity>;
  abstract challenges: IGenericRepository<Pure<ChallengeEntity>, ChallengeEntity>;
  abstract teams: IGenericRepository<Pure<TeamEntity>, TeamEntity>;
  abstract problems: IGenericRepository<Pure<ProblemEntity>, ProblemEntity>;
  abstract testcases: IGenericRepository<Pure<TestcaseEntity>, TestcaseEntity>;
  abstract queries: OttomanQueries;

  abstract articles: IGenericRepository<Pure<ArticleEntity>, ArticleEntity>;
  abstract discussions: IGenericRepository<Pure<DiscussionEntity>, DiscussionEntity>;
  abstract comments: IGenericRepository<Pure<CommentEntity>, CommentEntity>;
}

import { SubmissionEntity } from '../entities';
import { ContestEntity } from '../entities/contest.entity';
import { TeamEntity } from '../entities/team.entity';
import { UserEntity } from '../entities/user.entity';
import { IGenericRepository } from '../repositories/generic.repository';

type Pure<T> = Omit<T, 'id'>;

export abstract class IDataService {
  abstract users: IGenericRepository<Pure<UserEntity>, UserEntity>;
  abstract submissions: IGenericRepository<
    Pure<SubmissionEntity>,
    SubmissionEntity
  >;
  abstract contests: IGenericRepository<Pure<ContestEntity>, ContestEntity>;
  abstract teams: IGenericRepository<Pure<TeamEntity>, TeamEntity>;
}

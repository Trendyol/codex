import { Exclude } from 'class-transformer';

import { SubmissionEntity } from '../entities';
import { UserEntity } from '../entities/user.entity';
import { IGenericRepository } from '../repositories/generic.repository';

type Pure<T> = Omit<T, 'id'>;

export abstract class IDataService {
  abstract users: IGenericRepository<Pure<UserEntity>, UserEntity>;
  abstract submissions: IGenericRepository<
    Pure<SubmissionEntity>,
    SubmissionEntity
  >;
}

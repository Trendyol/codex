import { Submission } from '../entities';
import { User } from '../entities/user.entity';
import { IGenericRepository } from '../repositories/generic.repository';

export abstract class IDataServices {
  abstract connection: any;
  abstract users: IGenericRepository<User, User>;
  abstract submissions: IGenericRepository<Submission, Submission>;
}

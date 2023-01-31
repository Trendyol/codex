import { Roles } from '@auth/models/constants';
import { IDataService } from '@core/data/services/data.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly dataService: IDataService) {}

  async create(name: string, email: string, avatar: string) {
    return this.dataService.users.create({ name, email, avatar, role: Roles.USER });
  }

  async findOne(filter: any) {
    return this.dataService.users.findOne(filter);
  }
}

import { Roles } from '@auth/models/constants';
import { IDataService } from '@core/data/services/data.service';
import { Injectable } from '@nestjs/common';


@Injectable()
export class UserService {
  constructor(private readonly dataService: IDataService) {}

  async create(name: string, email: string, avatar: string) {
    return this.dataService.users.create({
      name,
      email,
      avatar,
      points: 0,
      role: Roles.USER,
      rank: 0,
    });
  }

  async findOne(filter: any) {
    return this.dataService.users.findOne(filter);
  }

  async findById(id: string) {
    return this.dataService.users.findById(id);
  }

  async updateProfile(
    id: string,
    updateProfileDto: { name?: string; bio?: string; rank?: number },
  ) {
    return this.dataService.users.update(id, updateProfileDto);
  }

  async find({ orderBy, order, limit }) {
    const filter = {};
    if (orderBy && order) {
      filter['sort'] = { [orderBy]: order };
    }
    if (limit) {
      filter['limit'] = limit;
    }
    return this.dataService.users.find({}, filter);
  }
}

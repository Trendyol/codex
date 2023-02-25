import { Roles } from '@auth/models/constants';
import { IDataService } from '@core/data/services/data.service';
import { Injectable } from '@nestjs/common';

import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(private readonly dataService: IDataService) {}

  async create(name: string, email: string, avatar: string) {
    return this.dataService.users.create({ name, email, avatar, points: 0, role: Roles.USER });
  }

  async findOne(filter: any) {
    return this.dataService.users.findOne(filter);
  }

  async findById(id: string) {
    return this.dataService.users.findById(id);
  }

  async updateProfile(id: string, updateProfileDto: UpdateProfileDto) {
    return this.dataService.users.update(id, updateProfileDto);
  }

  async find({ orderBy, order, limit }) {
    const filter = {
      orderBy: orderBy || {},
      order: order || 'desc',
      limit: limit || 20,
    };

    return this.dataService.users.find({}, filter);
  }
}

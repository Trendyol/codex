import { Injectable } from '@nestjs/common';

import { OttomanService } from '../providers/ottoman/ottoman.service';

@Injectable()
export class UserService {
  constructor(private readonly ottomanService: OttomanService) {}

  async create(name: string, email: string) {
    const user = new this.ottomanService.UserModel({
      name,
      email,
    });

    return user.save();
  }

  async findOne(filter: any) {
    return this.ottomanService.UserModel.findOne(filter);
  }
}

import { Roles } from '@auth/models/constants';
import { IDataService } from '@core/data/services/data.service';
import { IStorageService } from '@core/data/services/storage.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private readonly dataService: IDataService,
    private readonly storageService: IStorageService,
  ) {}

  async create(name: string, email: string, avatar: string) {
    return this.dataService.users.create({
      name,
      email,
      avatar,
      points: 0,
      role: Roles.USER,
      rank: 0,
      challenges: [],
      problems: [],
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
    file?: Express.Multer.File,
  ) {
    let url: string;
    if (file) {
      url = await this.storageService.upload(file.filename, file.path);
    }

    return this.dataService.users.update(id, {
      name: updateProfileDto.name,
      bio: updateProfileDto.bio,
      rank: updateProfileDto.rank,
      ...(url && { avatar: url }),
    });
  }

  async find({
    orderBy,
    order,
    limit,
    name,
  }: {
    orderBy?: string;
    order?: string;
    limit?: number;
    name?: string;
  }) {
    const filter = {};
    const args = {};
    if (orderBy && order) {
      args['sort'] = { [orderBy]: order };
    }
    if (limit) {
      args['limit'] = limit;
    }
    if (name) {
      filter['name'] = { $like: `%${name}%` };
    }
    return this.dataService.users.find(filter, args);
  }
}

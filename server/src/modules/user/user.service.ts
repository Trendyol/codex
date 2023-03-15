import { Roles } from '@auth/models/constants';
import { IDataService } from '@core/data/services/data.service';
import { Injectable } from '@nestjs/common';
import cdn from "@trendyol-js/cdn";
import * as fs from "fs";
import * as path from 'path';

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
      challenges: [],
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
    file?: any
  ) {
    // File upload
    const environment = process.env.CDN_ENV;
    const team = process.env.CDN_TEAM;
    const secret = process.env.CDN_SECRET;
    console.log(file)
  
    // await cdn.authorize(secret);
  
    fs.mkdirSync(path.join(__dirname, 'temp'), {recursive: true });
    const filePath = path.join(__dirname, `temp`);
    
  
    // const options = {
    //   environment,
    //   team,
    //   secret,
    // };
    // const item = await cdn.item({ sourcePath, ...options });
    // const result = await cdn.upload(item);
  
    // fs.unlinkSync(sourcePath);
    return this.dataService.users.update(id, {
      name: updateProfileDto.name,
      bio: updateProfileDto.bio,
      rank: updateProfileDto.rank,
    });
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

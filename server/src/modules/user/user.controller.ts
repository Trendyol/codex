import { UserEntity } from '@core/data/entities';
import { User } from '@core/decorators/user.decorator';
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserService } from './user.service';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(JwtGuard)
  async getUser(@User() user: UserEntity) {
    const { id, name, email, avatar, points, bio, role, rank } = await this.userService.findOne({
      email: user.email,
    });

    return { id, name, email, avatar, points, bio, role, rank };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    return user;
  }

  generateFilename(file: Express.Multer.File) {
    return `${Date.now()}.${extname(file.originalname)}`;
  }

  @UseGuards(JwtGuard)
  @Put(':id/profile')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: 'temp',
        filename: (req: any, file: any, cb: any) =>
          cb(null, `${Date.now()}${extname(file.originalname)}`),
      }),
    }),
  )
  async updateProfile(
    @Param('id') id: string,
    @User() user,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const updatedUser = await this.userService.updateProfile(user.id, updateProfileDto, file);
    return updatedUser;
  }

  @Get()
  @UseGuards(JwtGuard)
  async find(
    @Query('orderBy') orderBy?: string,
    @Query('order') order?: string,
    @Query('limit') limit?: number,
  ) {
    const users = await this.userService.find({ orderBy, order, limit });
    return users;
  }

  @Get('/rank/update')
  @UseGuards(JwtGuard)
  async updateRank() {
    const users = await this.userService.find({ orderBy: 'points', order: 'desc', limit: 1000 });
    const updatedUsers = await Promise.all(
      users.map(async (user, index) => {
        const updatedUser = await this.userService.updateProfile(user.id, { rank: index + 1 });
        return updatedUser;
      }),
    );
    return updatedUsers;
  }
}

import { UserEntity } from '@core/data/entities';
import { User } from '@core/decorators/user.decorator';
import { Body, Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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

  @UseGuards(JwtGuard)
  @Put(':id/profile')
  async updateProfile(
    @Param('id') id: string,
    @User() user,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const updatedUser = await this.userService.updateProfile(user.id, updateProfileDto);
    return updatedUser;
  }

  @Get()
  @UseGuards(JwtGuard)
  async find(@Query('orderBy') orderBy?: string,
  @Query('order') order?: string,
  @Query('limit') limit?: number
  ) {
    const users = await this.userService.find({ orderBy, order, limit});
    return users;
  }

  @Get('/rank/update')
  @UseGuards(JwtGuard)
  async updateRank() {
    const users = await this.userService.find({ orderBy: 'points', order: 'desc', limit: 1000 });
    const updatedUsers = await Promise.all(users.map(async (user, index) => {
      const updatedUser = await this.userService.updateProfile(user.id, { rank: index + 1 });
      return updatedUser;
    }));
    return updatedUsers;
  }
}

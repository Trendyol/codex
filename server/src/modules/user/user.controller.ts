import { UserEntity } from '@core/data/entities';
import { User } from '@core/decorators/user.decorator';
import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
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
    const { id, name, email, avatar, bio, role } = await this.userService.findOne({
      email: user.email,
    });

    return { id, name, email, avatar, bio, role };
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
}

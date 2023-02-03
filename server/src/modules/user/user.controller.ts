import { UserEntity } from '@core/data/entities';
import { User } from '@core/decorators/user.decorator';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserService } from './user.service';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(JwtGuard)
  async getUser(@User() user: UserEntity) {
    const { id, name, email, avatar, role } = await this.userService.findOne({
      email: user.email,
    });

    return { id, name, email, avatar, role };
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    return user;
  }
}

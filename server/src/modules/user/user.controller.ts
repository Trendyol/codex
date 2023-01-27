import config from '@core/config/configuration';
import { UserEntity } from '@core/data/entities';
import { User } from '@core/decorators/user.decorator';
import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(JwtGuard)
  async getUser(@User() user: UserEntity) {
    console.log(config.port);
    const { name, email } = await this.userService.findOne({
      email: user.email,
    });

    return user;
  }
}

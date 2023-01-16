import { User } from '@core/decorators/user.decorator';
import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(JwtGuard)
  getUser(@User() user) {
    return user.name;
  }
}

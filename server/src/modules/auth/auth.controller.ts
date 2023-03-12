import { ACCESS_TOKEN } from '@auth/models/constants';
import config from '@core/config/configuration';
import { UserEntity } from '@core/data/entities';
import { User } from '@core/decorators/user.decorator';
import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { GoogleGuard } from './guards/google.guard';
import { JwtGuard } from './guards/jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async googleAuthCallback(@User() user: UserEntity, @Res() response) {
    const token = await this.authService.handleAuth(user);

    response.cookie(ACCESS_TOKEN, token, { httpOnly: true });
    return response.redirect(config.redirectUrl);
  }

  @Get('logout')
  @UseGuards(JwtGuard)
  async logout(@Res() response) {
    response.clearCookie(ACCESS_TOKEN);
    return response.send().status(200);
  }
}

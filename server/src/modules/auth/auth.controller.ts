import config from '@core/config/configuration';
import { ACCESS_TOKEN } from '@core/constants';
import { UserEntity } from '@core/data/entities';
import { User } from '@core/decorators/user.decorator';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { GoogleGuard } from './guards/google.guard';

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
}

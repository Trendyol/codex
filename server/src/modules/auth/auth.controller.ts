import { ACCESS_TOKEN } from '@core/constants';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { GoogleGuard } from './guards/google.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {}

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async googleAuthCallback(@Req() request, @Res() response) {
    const token = await this.authService.handleAuth(request.user);

    response.cookie(ACCESS_TOKEN, token, { httpOnly: true });
    return response.redirect(this.configService.get('REDIRECT_URL'));
  }
}

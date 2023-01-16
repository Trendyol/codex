import { ACCESS_TOKEN } from '@core/constants';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([(request) => request?.cookies?.[ACCESS_TOKEN]]),
    });
  }

  async validate(payload) {
    // Can be used to validate the payload before it is passed to the controller
    return payload;
  }
}

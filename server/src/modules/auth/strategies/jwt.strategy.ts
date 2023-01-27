import config from '@core/config/configuration';
import { ACCESS_TOKEN } from '@core/constants';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      secretOrKey: config.jwt.secret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => request?.cookies?.[ACCESS_TOKEN],
      ]),
    });
  }

  async validate(payload) {
    // Can be used to validate the payload before it is passed to the controller
    return { test: 1, ...payload };
  }
}

import { ACCESS_HEADER, ACCESS_TOKEN } from '@auth/models/constants';
import config from '@core/config/configuration';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AnonymousStrategy extends PassportStrategy(Strategy, 'anonymous') {
  constructor() {
    super({
      secretOrKey: config.jwt.secret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) =>
          request?.cookies?.[ACCESS_TOKEN] || (request?.headers?.[ACCESS_HEADER] as string),
      ]),
    });
  }
  async validate(payload) {
    return payload;
  }
}

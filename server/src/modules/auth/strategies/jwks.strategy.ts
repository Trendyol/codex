import config from '@core/config/configuration';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import express from 'express'
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';


function cookieExtractor(req: express.Request): string | null{
  console.log(req.cookies)
  return req.cookies[config.jwks.cookieName] || null
}

function headerExtractor(req: express.Request): string | null{
  return req.cookies[config.jwks.headerName] || null
}


@Injectable()
export class JwksStrategy extends PassportStrategy(Strategy, 'jwks') {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${config.jwks.uri}`,
      }),

      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, headerExtractor]),
      issuer: `${config.jwks.issuer}`,
      algorithms: [config.jwks.algorithm],
    });
  }

  validate(payload: unknown): unknown {
    return payload;
  }
}

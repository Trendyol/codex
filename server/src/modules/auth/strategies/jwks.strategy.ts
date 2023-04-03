import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import express from 'express'
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';


function cookieExtractor(req: express.Request): string | null{
  console.log(req.cookies)
  return req.cookies[process.env.JWT_COOKIE_NAME] || null
}

function headerExtractor(req: express.Request): string | null{
  return req.cookies[process.env.JWT_HEADER_NAME] || null
}


@Injectable()
export class JwksStrategy extends PassportStrategy(Strategy, 'jwks') {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.JWKS_URI}`,
      }),

      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, headerExtractor]),
      issuer: `${process.env.JWKS_ISSUER}`,
      algorithms: [process.env.JWKS_ALGORITHM],
    });
  }

  validate(payload: unknown): unknown {
    return payload;
  }
}

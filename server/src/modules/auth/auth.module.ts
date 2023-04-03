import config from '@core/config/configuration';
import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwksStrategy } from './strategies/jwks.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    DataModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: config.jwt.secret,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwksStrategy, GoogleStrategy, AnonymousStrategy],
})
export class AuthModule {}

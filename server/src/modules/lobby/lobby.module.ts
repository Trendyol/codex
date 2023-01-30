import config from '@core/config/configuration';
import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@user/user.module';

import { LobbyController } from './lobby.controller';
import { LobbyGateway } from './lobby.gateway';
import { LobbyService } from './lobby.service';

@Module({
  imports: [
    UserModule,
    DataModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: config.jwt.secret,
      }),
    }),
  ],
  providers: [LobbyService, LobbyGateway],
  controllers: [LobbyController],
  exports: [LobbyService],
})
export class LobbyModule {}

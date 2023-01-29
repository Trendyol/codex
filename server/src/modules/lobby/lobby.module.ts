import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';

import { LobbyController } from './lobby.controller';
import { LobbyGateway } from './lobby.gateway';
import { LobbyService } from './lobby.service';

@Module({
  imports: [UserModule, DataModule],
  providers: [LobbyService, LobbyGateway],
  controllers: [LobbyController],
  exports: [LobbyService],
})
export class LobbyModule {}

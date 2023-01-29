import { ChallengeModule } from '@challenge/challenge.module';
import { Module } from '@nestjs/common';

import { LobbyController } from './lobby.controller';
import { LobbyGateway } from './lobby.gateway';
import { LobbyService } from './lobby.service';

@Module({
  imports: [ChallengeModule],
  providers: [LobbyService, LobbyGateway, ChallengeModule],
  controllers: [LobbyController],
})
export class LobbyModule {}

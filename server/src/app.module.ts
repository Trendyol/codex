import { AuthModule } from '@auth/auth.module';
import { ChallengeModule } from '@challenge/challenge.module';
import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';

import { LobbyModule } from './modules/lobby/lobby.module';
import { RoomController } from './modules/room/room.controller';
import { RoomModule } from './modules/room/room.module';
import { TeamController } from './modules/team/team.controller';
import { TeamModule } from './modules/team/team.module';
import { TeamService } from './modules/team/team.service';

@Module({
  imports: [UserModule, AuthModule, DataModule, ChallengeModule, LobbyModule, RoomModule, TeamModule],
  controllers: [RoomController, TeamController],
  providers: [TeamService],
})
export class AppModule {}

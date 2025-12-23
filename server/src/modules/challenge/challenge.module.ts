import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { LobbyModule } from '../lobby/lobby.module';
import { RoomModule } from '../room/room.module';
import { TeamModule } from '../team/team.module';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { MailModule } from '../providers/mail/mail.module';


@Module({
  imports: [DataModule, TeamModule, LobbyModule, RoomModule, ScheduleModule.forRoot(), MailModule],
  providers: [ChallengeService],
  controllers: [ChallengeController],
  exports: [ChallengeService],
})
export class ChallengeModule {}

import { ChallengeModule } from '@challenge/challenge.module';
import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';

import { TeamModule } from '../team/team.module';
import { RoomGateway } from './room.gateway';
import { RoomService } from './room.service';

@Module({
  imports: [DataModule, TeamModule, ChallengeModule],
  exports: [RoomService],
  providers: [RoomGateway, RoomService],
})
export class RoomModule {}

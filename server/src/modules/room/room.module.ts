import { ChallengeModule } from '@challenge/challenge.module';
import config from '@core/config/configuration';
import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TeamModule } from '../team/team.module';
import { RoomController } from './room.controller';
import { RoomGateway } from './room.gateway';
import { RoomService } from './room.service';

@Module({
  imports: [
    DataModule,
    TeamModule,
    ChallengeModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: config.jwt.secret,
      }),
    }),
  ],
  exports: [RoomService, RoomGateway],
  providers: [RoomGateway, RoomService],
  controllers: [RoomController],
})
export class RoomModule {}

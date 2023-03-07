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
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: config.jwt.secret,
      }),
    }),
  ],
  providers: [RoomGateway, RoomService],
  controllers: [RoomController],
  exports: [RoomService, RoomGateway],
})
export class RoomModule {}

import { AuthModule } from '@auth/auth.module';
import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';

import { ContestModule } from './modules/contest/contest.module';
import { GameModule } from './modules/game/game.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    DataModule,
    ContestModule,
    GameModule,
  ],
})
export class AppModule {}

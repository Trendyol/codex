import { AuthModule } from '@auth/auth.module';
import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';

import { ChallengeModule } from './modules/challenge/challenge.module';
import { GameModule } from './modules/game/game.module';

@Module({
  imports: [UserModule, AuthModule, DataModule, ChallengeModule, GameModule],
})
export class AppModule {}

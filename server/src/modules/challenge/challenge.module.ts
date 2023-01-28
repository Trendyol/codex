import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';

import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';

@Module({
  imports: [DataModule],
  providers: [ChallengeService],
  controllers: [ChallengeController],
})
export class ChallengeModule {}

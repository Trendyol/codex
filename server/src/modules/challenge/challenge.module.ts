import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';

import { TeamModule } from '../team/team.module';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';

@Module({
  imports: [DataModule, TeamModule],
  providers: [ChallengeService],
  controllers: [ChallengeController],
  exports: [ChallengeService],
})
export class ChallengeModule {}

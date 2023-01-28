import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';

import { ContestController } from './contest.controller';
import { ContestService } from './contest.service';

@Module({
  imports: [DataModule],
  providers: [ContestService],
  controllers: [ContestController],
})
export class ContestModule {}

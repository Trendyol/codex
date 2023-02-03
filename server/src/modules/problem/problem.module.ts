import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';

import { ProblemController } from './problem.controller';
import { ProblemService } from './problem.service';

@Module({
  imports: [DataModule],
  controllers: [ProblemController],
  providers: [ProblemService],
})
export class ProblemModule {}

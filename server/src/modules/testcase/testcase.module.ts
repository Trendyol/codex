import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';

import { TestcaseController } from './testcase.controller';
import { TestcaseService } from './testcase.service';

@Module({
  imports: [DataModule],
  controllers: [TestcaseController],
  providers: [TestcaseService],
})
export class TestcaseModule {}

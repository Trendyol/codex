import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';

import { RoomModule } from '../room/room.module';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';

@Module({
  imports: [DataModule, RoomModule],
  controllers: [SubmissionController],
  providers: [SubmissionService],
})
export class SubmissionModule {}

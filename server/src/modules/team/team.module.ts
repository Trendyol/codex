import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';

import { TeamService } from './team.service';

@Module({
  imports: [DataModule],
  providers: [TeamService, DataModule],
  exports: [TeamService],
})
export class TeamModule {}

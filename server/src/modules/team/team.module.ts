import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';

import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  imports: [DataModule],
  providers: [TeamService, DataModule],
  exports: [TeamService],
  controllers: [TeamController],
})
export class TeamModule {}

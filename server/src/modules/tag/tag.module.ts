import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';

import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [DataModule],
  providers: [TagService, DataModule],
  exports: [TagService],
  controllers: [TagController],
})
export class TagModule {}

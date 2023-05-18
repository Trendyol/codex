import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';

import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';

@Module({
  imports: [DataModule],
  controllers: [PublicationController],
  providers: [PublicationService],
})
export class PublicationModule {}

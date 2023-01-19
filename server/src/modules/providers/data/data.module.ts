import { Module } from '@nestjs/common';
import { OttomanModule } from '@ottoman/ottoman.module';

@Module({
  imports: [OttomanModule],
  exports: [OttomanModule],
})
export class DataModule {}

import { Module } from '@nestjs/common';
import { OttomanModule } from '@ottoman/ottoman.module';

@Module({
  imports: [OttomanModule],
  providers: [OttomanModule],
})
export class DataModule {}

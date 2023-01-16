import { Module } from '@nestjs/common';

import { OttomanService } from './ottoman.service';

@Module({
  providers: [OttomanService],
  exports: [OttomanService],
})
export class OttomanModule {}

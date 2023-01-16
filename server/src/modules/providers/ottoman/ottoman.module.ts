import { IDataServices } from '@core/data/services/data.service';
import { Module } from '@nestjs/common';

import { OttomanDataServices } from './ottoman.service';

@Module({
  providers: [
    {
      provide: IDataServices,
      useClass: OttomanDataServices,
    },
  ],
  exports: [IDataServices],
})
export class OttomanModule {}

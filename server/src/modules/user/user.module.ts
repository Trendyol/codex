import { Module } from '@nestjs/common';
import { OttomanService } from '@ottoman/ottoman.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, OttomanService],
  exports: [UserService],
})
export class UserModule {}

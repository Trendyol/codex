import { Module } from '@nestjs/common';
import { OttomanModule } from '@ottoman/ottoman.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [OttomanModule],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}

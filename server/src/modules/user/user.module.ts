import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [DataModule],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}

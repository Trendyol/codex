import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';

import { StorageModule } from '../providers/storage/storage.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [DataModule, StorageModule],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}

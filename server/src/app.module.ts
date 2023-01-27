import { AuthModule } from '@auth/auth.module';
import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    DataModule,
  ],
})
export class AppModule {}

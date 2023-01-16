import { AuthModule } from '@auth/auth.module';
import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    DataModule,
  ],
})
export class AppModule {}

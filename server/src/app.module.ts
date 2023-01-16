import { AuthModule } from '@auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OttomanModule } from '@ottoman/ottoman.module';
import { UserModule } from '@user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), OttomanModule, UserModule, AuthModule],
})
export class AppModule {}

import { UserEntity } from '@core/data/entities';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UserDto implements Partial<UserEntity> {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;
}

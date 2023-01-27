import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UserDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;
}

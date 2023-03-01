import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty()
  @IsString()
  readonly name?: string;

  @ApiProperty()
  @IsString()
  readonly bio?: string;
}

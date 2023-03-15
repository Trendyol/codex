import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class UpdateProfileDto {
  @ApiProperty()
  @IsString()
  readonly name?: string;

  @ApiProperty()
  @IsString()
  readonly bio?: string;

  @ApiProperty()
  @IsOptional()
  readonly avatar?: Record<string, any>;
}

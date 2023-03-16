import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
export class UpdateProfileDto {
  @ApiProperty()
  @IsString()
  @MaxLength(24)
  @MinLength(1)
  readonly name?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(300)
  readonly bio?: string;

  @ApiProperty()
  @IsOptional()
  readonly avatar?: Record<string, any>;
}

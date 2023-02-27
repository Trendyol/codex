import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsEnum, IsString } from 'class-validator';

import { Language } from '../models/enums';

export class RunDto {
  @ApiProperty()
  @IsBase64()
  readonly code: string;

  @ApiProperty()
  @IsEnum(Language)
  readonly language: number;

  @ApiProperty()
  @IsString()
  readonly problemId: string;
}

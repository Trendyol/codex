import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsEnum } from 'class-validator';

import { Language } from '../models/enums';

export class SubmissionDto {
  @ApiProperty()
  @IsBase64()
  readonly code: string;

  @ApiProperty()
  @IsEnum(Language)
  readonly language: number;
}

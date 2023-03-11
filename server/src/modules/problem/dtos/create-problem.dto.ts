import { DefaultCodes } from '@core/data/entities/problem.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

import { Difficulty } from '../models/enums';

export class CreateProblemDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly content: string;

  @ApiProperty()
  @IsNumber()
  readonly difficulty: Difficulty;

  @ApiProperty()
  @IsArray()
  readonly defaultCodes: DefaultCodes[];

}

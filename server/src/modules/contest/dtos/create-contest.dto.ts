import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsDateString } from 'class-validator';

export class CreateContestDto {
  @ApiProperty()
  @IsAlphanumeric()
  readonly name: string;

  @ApiProperty()
  @IsAlphanumeric()
  readonly question: string;

  @ApiProperty()
  @IsDateString()
  readonly date: Date;
}

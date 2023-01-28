import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateContestDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly question: string;

  @ApiProperty()
  @IsNumber()
  readonly teamSize: number;

  @ApiProperty()
  @IsDateString()
  readonly date: Date;
}

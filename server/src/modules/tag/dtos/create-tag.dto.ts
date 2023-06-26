import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsBoolean()
  readonly forArticle: boolean;

  @ApiProperty()
  @IsBoolean()
  readonly forProblem: boolean;
}

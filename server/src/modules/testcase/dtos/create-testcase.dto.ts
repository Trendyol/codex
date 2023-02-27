import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsBoolean, IsString } from 'class-validator';

export class CreateTestcaseDto {
  @ApiProperty()
  @IsBase64()
  readonly stdin: string;

  @ApiProperty()
  @IsBase64()
  readonly expected_output: string;

  @ApiProperty()
  @IsBoolean()
  readonly isPublic: boolean;

  @ApiProperty()
  @IsString()
  readonly problemId: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class BaseCreatePublicationDto {
  @ApiProperty()
  @IsString()
  readonly userId: string;

  @ApiProperty()
  @IsString()
  readonly content: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  readonly isPublished: boolean;

  @ApiProperty()
  @IsArray()
  readonly likedBy: string[];
}

export class CreateArticleDto extends BaseCreatePublicationDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsBoolean()
  readonly isApproved: boolean;
}

export class CreateDiscussionDto extends BaseCreatePublicationDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly problemId: string;
}

export class CreateCommentDto extends BaseCreatePublicationDto {
  @ApiProperty()
  @IsString()
  readonly parentId: string;

  @ApiProperty()
  @IsNumber()
  readonly depth: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class BaseCreatePublicationDto {
  @ApiProperty()
  @IsString()
  readonly content: string;

  @ApiProperty()
  @IsBoolean()
  readonly isPublished: boolean;
}

export class ArticleEditorDto extends BaseCreatePublicationDto {
  @ApiProperty()
  @IsString()
  readonly title: string;
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

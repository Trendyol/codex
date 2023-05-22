import { AdminGuard } from '@auth/guards/admin.guard';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateArticleDto,
  CreateCommentDto,
  CreateDiscussionDto,
} from './dtos/create-publication.dto';
import { PublicationService } from './publication.service';

@ApiTags('Publication')
@Controller('publication')
export class PublicationController {
  constructor(private readonly articleService: PublicationService) {}

  @Post('/create-article')
  @UseGuards(JwtGuard, AdminGuard)
  createArticle(@Body() createDto: CreateArticleDto) {
    return this.articleService.createArticle({
      ...createDto,
      isPublished: createDto.isPublished || false,
    });
  }

  @Post('/create-discussion')
  @UseGuards(JwtGuard, AdminGuard)
  createDiscussion(@Body() createDto: CreateDiscussionDto) {
    return this.articleService.createDiscussion({
      ...createDto,
      isPublished: createDto.isPublished || true,
    });
  }

  @Post('/create-comment')
  @UseGuards(JwtGuard, AdminGuard)
  createComment(@Body() createDto: CreateCommentDto) {
    return this.articleService.createComment({
      ...createDto,
      isPublished: createDto.isPublished || true,
    });
  }
}

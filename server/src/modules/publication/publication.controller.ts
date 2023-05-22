import { AdminGuard } from '@auth/guards/admin.guard';
import { AnonymousGuard } from '@auth/guards/anonymous.guard';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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
  constructor(private readonly publicationService: PublicationService) {}

  @Post('/articles')
  @UseGuards(JwtGuard, AdminGuard)
  createArticle(@Body() createDto: CreateArticleDto) {
    return this.publicationService.createArticle({
      ...createDto,
      isPublished: createDto.isPublished || false,
    });
  }

  @Post('/discussions')
  @UseGuards(JwtGuard, AdminGuard)
  createDiscussion(@Body() createDto: CreateDiscussionDto) {
    return this.publicationService.createDiscussion({
      ...createDto,
      isPublished: createDto.isPublished || true,
    });
  }

  @Post('/comments')
  @UseGuards(JwtGuard, AdminGuard)
  createComment(@Body() createDto: CreateCommentDto) {
    return this.publicationService.createComment({
      ...createDto,
      isPublished: createDto.isPublished || true,
    });
  }

  @Get('/articles')
  @UseGuards(AnonymousGuard)
  findAllArticles() {
    return this.publicationService.findAllArticles();
  }

  @Get('/discussions')
  @UseGuards(AnonymousGuard)
  findAllDiscussions() {
    return this.publicationService.findAllDiscussions();
  }

  @Get('/comments')
  @UseGuards(AnonymousGuard)
  findAllComments() {
    return this.publicationService.findAllComments();
  }

  @Get('/articles/:articleId')
  @UseGuards(AnonymousGuard)
  findArticleById(@Param('articleId') articleId: string) {
    return this.publicationService.findArticleById(articleId);
  }

  @Get('/discussions/:discussionId')
  @UseGuards(AnonymousGuard)
  findDiscussionById(@Param('discussionId') discussionId: string) {
    return this.publicationService.findDiscussionById(discussionId);
  }

  @Get('/comments/:commentId')
  @UseGuards(AnonymousGuard)
  findCommentById(@Param('commentId') commentId: string) {
    return this.publicationService.findCommentById(commentId);
  }
}

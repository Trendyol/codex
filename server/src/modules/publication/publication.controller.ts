import { AdminGuard } from '@auth/guards/admin.guard';
import { AnonymousGuard } from '@auth/guards/anonymous.guard';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

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
  findArticles() {
    return this.publicationService.findArticles();
  }

  @Get('/discussions')
  @UseGuards(AnonymousGuard)
  @ApiQuery({ name: 'problemId', required: false, type: String })
  @ApiQuery({ name: 'userId', required: false, type: String })
  @ApiQuery({ name: 'isPublished', required: false, type: Boolean })
  findDiscussions(
    @Query('problemId') problemId?: string,
    @Query('userId') userId?: string,
    @Query('isPublished') isPublished?: boolean,
  ) {
    console.log('isPublished', isPublished);

    return this.publicationService.findDiscussions(problemId, userId, isPublished);
  }

  @Get('/comments')
  @UseGuards(AnonymousGuard)
  @ApiQuery({ name: 'depth', required: false, type: Number })
  @ApiQuery({ name: 'parentId', required: false, type: String })
  @ApiQuery({ name: 'userId', required: false, type: String })
  @ApiQuery({ name: 'isPublished', required: false, type: String, enum: ['true', 'false'] })
  findComments(
    @Query('depth') depth?: number,
    @Query('parentId') parentId?: string,
    @Query('userId') userId?: string,
    @Query('isPublished') isPublished?: string,
  ) {
    if (isNaN(depth)) {
      depth = undefined;
    }

    const _isPublished = isPublished === 'false' ? false : isPublished === 'true' || undefined;
    return this.publicationService.findComments(depth, parentId, userId, _isPublished);
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

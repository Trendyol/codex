import { AnonymousGuard } from '@auth/guards/anonymous.guard';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { User } from '@core/decorators/user.decorator';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import {
  ArticleEditorDto,
  CreateCommentDto,
  CreateDiscussionDto,
} from './dtos/create-publication.dto';
import { PublicationService } from './publication.service';

@ApiTags('Publication')
@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post('/articles')
  @UseGuards(JwtGuard)
  ArticleEditor(@User() user, @Body() createDto: ArticleEditorDto) {
    return this.publicationService.ArticleEditor(createDto, user.id);
  }

  @Post('/discussions')
  @UseGuards(JwtGuard)
  createDiscussion(@User() user, @Body() createDto: CreateDiscussionDto) {
    return this.publicationService.createDiscussion(createDto, user.id);
  }

  @Post('/comments')
  @UseGuards(JwtGuard)
  createComment(@User() user, @Body() createDto: CreateCommentDto) {
    return this.publicationService.createComment(createDto, user.id);
  }

  @Get('/articles')
  @UseGuards(AnonymousGuard)
  findArticles() {
    return this.publicationService.findArticles();
  }

  @Get('/articles/drafts')
  @UseGuards(AnonymousGuard)
  findDraftArticles(@User() user) {
    return this.publicationService.findDraftArticles(user.id);
  }

  @Get('/discussions')
  @UseGuards(AnonymousGuard)
  @ApiQuery({ name: 'isPublished', required: false, type: Boolean })
  @ApiQuery({ name: 'problemId', required: false, type: String })
  @ApiQuery({ name: 'userId', required: false, type: String })
  findDiscussions(
    @Query('isPublished') isPublished: boolean,
    @Query('problemId') problemId?: string,
    @Query('userId') userId?: string,
  ) {
    return this.publicationService.findDiscussions(problemId, userId, isPublished);
  }

  @Get('/comments')
  @UseGuards(AnonymousGuard)
  @ApiQuery({ name: 'isPublished', required: false, type: Boolean })
  @ApiQuery({ name: 'parentId', required: false, type: String })
  @ApiQuery({ name: 'userId', required: false, type: String })
  findComments(
    @Query('isPublished') isPublished?: boolean,
    @Query('parentId') parentId?: string,
    @Query('userId') userId?: string,
  ) {
    return this.publicationService.findComments(parentId, userId, isPublished);
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

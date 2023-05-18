import { AdminGuard } from '@auth/guards/admin.guard';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateArticleDto, CreateCommentDto, CreateDiscussionDto } from './dtos/create-article.dto';
import { PublicationService } from './publication.service';

@ApiTags('Publication')
@Controller('article')
export class PublicationController {
  constructor(private readonly articleService: PublicationService) {}

  @Post('/create-article')
  @UseGuards(JwtGuard, AdminGuard)
  createArticle(@Body() createDto: CreateArticleDto) {
    return createDto;
  }

  @Post('/create-discussion')
  @UseGuards(JwtGuard, AdminGuard)
  createDiscussion(@Body() createDto: CreateDiscussionDto) {
    return createDto;
  }

  @Post('/create-comment')
  @UseGuards(JwtGuard, AdminGuard)
  createComment(@Body() createDto: CreateCommentDto) {
    return createDto;
  }
}

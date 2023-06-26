import { AdminGuard } from '@auth/guards/admin.guard';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateTagDto } from './dtos/create-tag.dto';
import { TagService } from './tag.service';

@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Post()
  @UseGuards(JwtGuard, AdminGuard)
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  @UseGuards()
  find(@Query('forArticle') forArticle: boolean, @Query('forProblem') forProblem: boolean) {
    return this.tagService.findAll(forArticle, forProblem);
  }
}

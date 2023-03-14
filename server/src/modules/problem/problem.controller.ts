import { AdminGuard } from '@auth/guards/admin.guard';
import { AnonymousGuard } from '@auth/guards/anonymous.guard';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { UserEntity } from '@core/data/entities';
import { User } from '@core/decorators/user.decorator';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateProblemDto } from './dtos/create-problem.dto';
import { ProblemService } from './problem.service';

@ApiTags('Problem')
@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post()
  @UseGuards(JwtGuard, AdminGuard)
  create(@Body() createProblemDto: CreateProblemDto) {
    return this.problemService.create(createProblemDto);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  findById(@Param('id') id: string) {
    return this.problemService.findById(id);
  }

  @Get()
  @UseGuards(AnonymousGuard)
  findAll(@User() user?: UserEntity) {
    return this.problemService.findAll(user?.id);
  }

  @Get(':id/default-code/:language')
  @UseGuards(JwtGuard)
  findDefaultCode(@Param('id') id: string, @Param('language') language: number) {
    return this.problemService.findDefaultCode(id, language);
  }
}

import { AdminGuard } from '@auth/guards/admin.guard';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { UserEntity } from '@core/data/entities';
import { User } from '@core/decorators/user.decorator';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ContestService } from './contest.service';
import { CreateContestDto } from './dtos/create-contest.dto';

@ApiTags('Contest')
@Controller('contest')
export class ContestController {
  constructor(private readonly contestService: ContestService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@Body() createContestDto: CreateContestDto) {
    return this.contestService.create(createContestDto);
  }

  @Post('participate/:contestId')
  @UseGuards(JwtGuard)
  participate(@User() user: UserEntity, @Param('contestId') contestId: string) {
    return this.contestService.participate(user.id, contestId);
  }

  @Get('join/:contestId')
  @UseGuards(JwtGuard)
  join(@User() user: UserEntity, @Param('contestId') contestId: string) {
    return this.contestService.join(user.id, contestId);
  }
}

import { AdminGuard } from '@auth/guards/admin.guard';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { UserEntity } from '@core/data/entities';
import { User } from '@core/decorators/user.decorator';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';

@ApiTags('Challenge')
@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post()
  @UseGuards(JwtGuard, AdminGuard)
  create(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengeService.create(createChallengeDto);
  }

  @Post('participate/:challengeId')
  @UseGuards(JwtGuard)
  participate(@User() user: UserEntity, @Param('challengeId') challengeId: string) {
    return this.challengeService.participate(user.id, challengeId);
  }

  @Get('join/:challengeId')
  @UseGuards(JwtGuard)
  join(@User() user: UserEntity, @Param('challengeId') challengeId: string) {
    const challenge = this.challengeService.join(user.id, challengeId);
    return challenge;
  }
}

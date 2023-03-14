import { AdminGuard } from '@auth/guards/admin.guard';
import { AnonymousGuard } from '@auth/guards/anonymous.guard';
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

  @Get()
  @UseGuards(AnonymousGuard)
  findAll(@User() user?: UserEntity) {
    return this.challengeService.findAll(user?.id);
  }

  @Get(':challengeId')
  @UseGuards(AnonymousGuard)
  findById(@Param('challengeId') challengeId: string, @User() user?: UserEntity) {
    return this.challengeService.findById(challengeId, user?.id);
  }

  @Post(':challengeId/participate')
  @UseGuards(JwtGuard)
  participate(@User() user: UserEntity, @Param('challengeId') challengeId: string) {
    return this.challengeService.participate(user.id, challengeId);
  }

  @Get(':challengeId/placements')
  @UseGuards(AnonymousGuard)
  getPlacements(@Param('challengeId') challengeId: string) {
    return this.challengeService.getPlacements(challengeId);
  }

  @Get('test/test/test')
  test(){
    return this.challengeService.finishChallenge("6a748a8d-06e5-40cd-a648-ad0feb493330")
  }
}

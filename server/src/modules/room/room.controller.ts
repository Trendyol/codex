import { JwtGuard } from '@auth/guards/jwt.guard';
import { UserEntity } from '@core/data/entities';
import { User } from '@core/decorators/user.decorator';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RoomService } from './room.service';

@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get(':challengeId')
  @UseGuards(JwtGuard)
  findRoom(@User() user: UserEntity, @Param('challengeId') challengeId: string) {
    const challenge = this.roomService.findRoom(user.id, challengeId);
    return challenge;
  }
}

import { JwtGuard } from '@auth/guards/jwt.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LobbyService } from './lobby.service';

@ApiTags('Lobby')
@Controller('lobby')
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Get(':challengeId')
  @UseGuards(JwtGuard)
  findRoom(@Param('challengeId') challengeId: string) {
    const room = this.lobbyService.findLobby(challengeId);
    return room;
  }
}

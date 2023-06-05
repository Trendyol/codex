import { Status } from '@challenge/models/enums';
import { IDataService } from '@core/data/services/data.service';
import { Injectable } from '@nestjs/common';

import { LobbyGateway } from './lobby.gateway';

@Injectable()
export class LobbyService {
  constructor(
    private readonly lobbyGateway: LobbyGateway,
    private readonly dataService: IDataService,
  ) {}

  async findLobby(challengeId: string) {
    const challenge = await this.dataService.challenges.findById(challengeId, { populate: '*' });

    return challenge;
  }

  async findActiveParticipants(challengeId: string) {
    return this.lobbyGateway.lobbies[challengeId];
  }

  changeStatus(lobbyId: string, status: Status) {
    this.lobbyGateway.changeStatus(lobbyId, status);
  }
}

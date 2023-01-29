import { Status } from '@challenge/models/enums';
import { IDataService } from '@core/data/services/data.service';
import { BadRequestException, Injectable } from '@nestjs/common';

import { LobbyGateway } from './lobby.gateway';

@Injectable()
export class LobbyService {
  constructor(
    private readonly lobbyGateway: LobbyGateway,
    private readonly dataService: IDataService,
  ) {}

  async findLobby(challengeId: string) {
    const challenge = await this.dataService.challenges.findById(challengeId, { populate: '*' });

    if (challenge.status == Status.pending) {
      return challenge;
    }

    throw new BadRequestException(`Can't find ${Status[challenge.status]} challenge lobby`);
  }

  async findActiveParticipants(challengeId: string) {
    return this.lobbyGateway.lobbies[challengeId];
  }
}

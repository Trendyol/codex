import { ChallengeService } from '@challenge/challenge.service';
import { Status } from '@challenge/models/enums';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class LobbyService {
  constructor(private readonly challengeService: ChallengeService) {}
  async findLobby(challengeId: string) {
    const challenge = await this.challengeService.findChallengeById(challengeId);

    if (challenge.status == Status.pending) {
      return await (challenge as any)._populate('*');
    }

    throw new BadRequestException(`Can't find ${Status[challenge.status]} challenge lobby`);
  }
}

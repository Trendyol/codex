import { ChallengeService } from '@challenge/challenge.service';
import { Status } from '@challenge/models/enums';
import { IDataService } from '@core/data/services/data.service';
import { BadRequestException, Injectable } from '@nestjs/common';

import { TeamService } from '../team/team.service';

@Injectable()
export class RoomService {
  constructor(
    private readonly teamService: TeamService,
    private readonly challengeService: ChallengeService,
  ) {}

  async findRoom(userId: string, challengeId: string) {
    const challenge = await this.challengeService.findChallengeById(challengeId);

    if (challenge.status == Status.ongoing) {
      return { ...challenge, team: await this.teamService.findTeam(userId, challengeId) };
    }

    throw new BadRequestException(`Can't find ${Status[challenge.status]} challenge room`);
  }
}

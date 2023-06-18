import { Status } from '@challenge/models/enums';
import { IDataService } from '@core/data/services/data.service';
import { BadRequestException, Injectable } from '@nestjs/common';

import { TeamService } from '../team/team.service';

@Injectable()
export class RoomService {
  constructor(
    private readonly teamService: TeamService,
    private readonly dataService: IDataService,
  ) {}

  async findRoom(userId: string, challengeId: string) {
    const challenge = await this.dataService.challenges.findById(challengeId);

    return { ...challenge, team: await this.teamService.findTeam(userId, challengeId) };
  }
}

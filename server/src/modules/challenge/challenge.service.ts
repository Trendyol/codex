import { IDataService } from '@core/data/services/data.service';
import { BadRequestException, Injectable } from '@nestjs/common';

import { LobbyService } from '../lobby/lobby.service';
import { TeamService } from '../team/team.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { Status } from './models/enums';

@Injectable()
export class ChallengeService {
  constructor(
    private readonly dataService: IDataService,
    private readonly teamService: TeamService,
    private readonly lobbyService: LobbyService,
  ) {}

  async create(createChallengeDto: CreateChallengeDto) {
    const challenge = await this.dataService.challenges.create({
      ...createChallengeDto,
      participants: [],
      status: Status.upcoming,
    });

    return challenge;
  }

  async findAll(userId?: string) {
    const challenges = await this.dataService.challenges.find({});
    return challenges.map((challenge) => ({
      ...challenge,
      question: challenge.status >= Status.ongoing && challenge.question,
      participated: challenge.participants.includes(userId),
    }));
  }

  async participate(userId: string, challengeId: string) {
    const { status, participants } = await this.dataService.challenges.findById(challengeId);

    if (status != Status.pending && status != Status.upcoming) {
      throw new BadRequestException(`Can't participate to ${Status[status]} challenge`);
    }

    if (participants.includes(userId)) {
      throw new BadRequestException('Already participated');
    }

    await this.dataService.challenges.update(challengeId, {
      participants: [...participants, userId],
    });
  }

  private async startChallenge(challengeId: string) {
    const activeParticipants = await this.lobbyService.findActiveParticipants(challengeId);
    this.teamService.setupTeams(challengeId, activeParticipants);
    return this.dataService.challenges.update(challengeId, { status: Status.ongoing });
  }

}

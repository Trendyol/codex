import { IDataService } from '@core/data/services/data.service';
import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { Status } from './models/enums';

@Injectable()
export class ChallengeService {
  constructor(private readonly dataService: IDataService) {}

  async create(createChallengeDto: CreateChallengeDto) {
    const challenge = await this.dataService.challenges.create({
      ...createChallengeDto,
      participants: [],
      status: Status.upcoming,
    });

    return challenge;
  }

  async participate(userId: string, challengeId: string) {
    const { status, participants } = await this.dataService.challenges.findById(
      challengeId,
    );

    if (status != Status.pending && status != Status.upcoming) {
      throw new BadRequestException(
        `Can't participate to ${Status[status]} challenge`,
      );
    }

    if (participants.includes(userId)) {
      throw new BadRequestException('Already participated');
    }

    await this.dataService.challenges.update(challengeId, {
      participants: [...participants, userId],
    });
  }

  createTeam(challengeId: string, participants: string[]) {
    return this.dataService.teams.create({ challengeId, participants });
  }

  startChallenge(challengeId: string) {
    this.setupTeams(challengeId);
    return this.dataService.challenges.update(challengeId, {
      status: Status.ongoing,
    });
  }

  async setupTeams(challengeId: string) {
    const challenge = await this.dataService.challenges.findById(challengeId);
    let participants = [];

    challenge.participants.forEach((participant) => {
      participants.push(participant);
      if (participants.length === challenge.teamSize) {
        this.createTeam(challengeId, participants);
        participants = [];
      }
    });

    if (participants.length) this.createTeam(challengeId, participants);
  }

  async join(userId: string, challengeId: string) {
    const challenge = await this.dataService.challenges.findById(challengeId);

    if (challenge.status == Status.pending) {
      return await (challenge as any)._populate('*');
    }

    if (challenge.status == Status.ongoing) {
      return { ...challenge, team: await this.findTeam(userId, challengeId) };
    }

    throw new BadRequestException(
      `Can't join to ${Status[challenge.status]} challenge`,
    );
  }

  async findTeam(userId: string, challengeId: string) {
    const { id, participants } = await this.dataService.teams.findOne(
      {
        challengeId,
        $any: {
          $expr: [{ team: { $in: 'participants' } }],
          $satisfies: { team: { $eq: userId } },
        },
      },
      {
        populate: '*',
      },
    );

    return { id, participants };
  }
}

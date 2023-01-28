import { IDataService } from '@core/data/services/data.service';
import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateContestDto } from './dtos/create-contest.dto';
import { Status } from './models/enums';

@Injectable()
export class ContestService {
  constructor(private readonly dataService: IDataService) {}

  async create(createContestDto: CreateContestDto) {
    const contest = await this.dataService.contests.create({
      ...createContestDto,
      participants: [],
      status: Status.upcoming,
    });

    return contest;
  }

  async participate(userId: string, contestId: string) {
    const contest = await this.dataService.contests.findById(contestId);

    if (contest.status != Status.pending && contest.status != Status.upcoming) {
      throw new BadRequestException(
        `Can't participate to ${Status[contest.status]} contest`,
      );
    }

    if (contest.participants.includes(userId)) {
      throw new BadRequestException('Already participated');
    }

    await this.dataService.contests.update(contestId, {
      participants: [...contest.participants, userId],
    });

    return contest;
  }

  createTeam(contestId: string, participants: string[]) {
    return this.dataService.teams.create({ contestId, participants });
  }

  startContest(contestId: string) {
    this.setupTeams(contestId);
    return this.dataService.contests.update(contestId, {
      status: Status.ongoing,
    });
  }

  async setupTeams(contestId: string) {
    const contest = await this.dataService.contests.findById(contestId);

    let participants = [];

    contest.participants.forEach((participant) => {
      participants.push(participant);
      if (participants.length === contest.teamSize) {
        this.createTeam(contestId, participants);
        participants = [];
      }
    });

    if (participants.length) this.createTeam(contestId, participants);
  }

  async join(userId: string, contestId: string) {
    const contest = await this.dataService.contests.findById(contestId);

    if (contest.status == Status.pending) {
      return await (contest as any)._populate('*');
    }

    if (contest.status == Status.ongoing) {
      return { ...contest, team: await this.findTeam(userId, contestId) };
    }

    throw new BadRequestException(
      `Can't join to ${Status[contest.status]} contest`,
    );
  }

  async findTeam(userId: string, contestId: string) {
    const { id, participants } = await this.dataService.teams.findOne(
      {
        contestId,
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

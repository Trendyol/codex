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
      teams: [],
      status: Status.upcoming,
    });

    return contest;
  }

  // Participate users to the contest
  async participate(userId: string, contestId: string) {
    const contest = await this.dataService.contests.findById(contestId);

    if (contest.status !== Status.pending) {
      throw new BadRequestException("Can't join contest");
    }

    if (contest.participants.includes(userId)) {
      throw new BadRequestException();
    }

    await this.dataService.contests.update(contestId, {
      participants: [...contest.participants, userId],
    });

    return contest;
  }

  createTeam(contestId: string, participants: string[]) {
    return this.dataService.teams.create({
      contestId,
      participants,
    });
  }

  startContest(contestId: string) {
    this.setupTeams(contestId);
    return this.dataService.contests.update(contestId, {
      status: Status.ongoing,
    });
  }

  async setupTeams(contestId: string) {
    // TODO: Add contest player limit
    const contest = await this.dataService.contests.findById(contestId);

    let participants = [];

    contest.participants.forEach((participant) => {
      participants.push(participant);
      if (participants.length === 3) {
        this.createTeam(contestId, participants);
        participants = [];
      }
    });

    if (participants.length) this.createTeam(contestId, participants);
  }

  async join(userId: string, contestId: string) {
    const contest = await this.dataService.contests.findOne({
      id: contestId,
    });

    if (contest.status === Status.pending) {
      return contest;
    }

    if (contest.status === Status.ongoing) {
      return this.info(userId, contestId);
    }

    throw new BadRequestException(
      `Can't join to ${Status[contest.status]} contest`,
    );
  }

  async info(userId: string, contestId: string) {
    const filter = {
      contestId,
      $any: {
        $expr: [{ team: { $in: 'participants' } }],
        $satisfies: { team: { $eq: userId } },
      },
    };

    const team = await this.dataService.teams.findOne(filter, {
      populate: '*',
    });

    return team;
  }
}

import { IDataService } from '@core/data/services/data.service';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { DateTime } from 'luxon';

import { LobbyService } from '../lobby/lobby.service';
import { TeamService } from '../team/team.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { PENDING_DURATION, STATUS_INTERVAL } from './models/constants';
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
      activeParticipants: [],
      status: Status.upcoming,
    });

    return challenge;
  }

  async findAll(userId?: string) {
    const challenges = await this.dataService.queries.findChallenges(userId);
    return challenges;
  }

  async findById(challengeId: string, userId?: string) {
    const challenge = await this.dataService.queries.findChallenge(challengeId, userId);
    return challenge;
  }

  async participate(userId: string, challengeId: string) {
    const challenge = await this.dataService.challenges.findById(challengeId);
    const { status, participants } = challenge;
    if (status != Status.pending && status != Status.upcoming) {
      throw new BadRequestException(`Can't participate to ${Status[status]} challenge`);
    }

    if (participants.includes(userId)) {
      throw new BadRequestException('Already participated');
    }

    await this.dataService.challenges.update(challengeId, {
      participants: [...participants, userId],
    });

    return challenge;
  }

  private async startChallenge(challengeId: string) {
    const activeParticipants = await this.lobbyService.findActiveParticipants(challengeId);

    await this.dataService.challenges.update(challengeId, {
      activeParticipants: activeParticipants?.map((ap) => ap.id),
    });
    await this.teamService.setupTeams(challengeId, activeParticipants);
    this.lobbyService.changeStatus(challengeId, Status.ongoing);
  }

  @Interval(STATUS_INTERVAL)
  async handleStatusUpdate() {
    const unfinishedChallenges = await this.dataService.challenges.find({
      status: { $lt: Status.finished },
    });

    unfinishedChallenges.forEach(async ({ id, status, date, duration }) => {
      const currentStatus = this.getCurrentStatus(date, duration);

      if (currentStatus != status) {
        await this.dataService.challenges.update(id, { status: currentStatus });
        Logger.log(`Challenge status updated ${id}: ${Status[currentStatus]}`);
        if (currentStatus == Status.ongoing) this.startChallenge(id);
      }
    });
  }

  getCurrentStatus(date: Date, duration: number) {
    const currentDateTime = DateTime.now();

    const challengeDateTime = DateTime.fromISO(date.toString());
    const challengePendingDateTime = challengeDateTime.minus({ minutes: PENDING_DURATION });
    const challengeFinishDateTime = challengeDateTime.plus({ minutes: duration });

    if (currentDateTime > challengeFinishDateTime) {
      return Status.finished;
    }

    if (currentDateTime > challengeDateTime) {
      return Status.ongoing;
    }

    if (currentDateTime > challengePendingDateTime) {
      return Status.pending;
    }

    return Status.upcoming;
  }
}

import { UserEntity } from '@core/data/entities';
import { IDataService } from '@core/data/services/data.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamService {
  constructor(private readonly dataService: IDataService) {}
  private createTeam(challengeId: string, participants: string[]) {
    return this.dataService.teams.create({ challengeId, participants });
  }

  async setupTeams(challengeId: string, activeParticipants: UserEntity[]) {
    // Create teams based on socket connected users not participants
    const challenge = await this.dataService.challenges.findById(challengeId);
    let participants = [];

    activeParticipants.forEach((participant) => {
      participants.push(participant);
      if (participants.length === challenge.teamSize) {
        this.createTeam(challengeId, participants);
        participants = [];
      }
    });

    if (participants.length) this.createTeam(challengeId, participants);
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
      { populate: '*' },
    );

    return { id, participants };
  }
}

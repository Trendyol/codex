import { QueryOptions, QueryResult } from 'couchbase';

import { queries } from './schemas/queries';

export class OttomanQueries {
  constructor(
    private _query: (query: string, options?: QueryOptions) => Promise<QueryResult<any>>,
  ) {}

  async findChallenges(userId?: string) {
    const result = await this._query(queries.findChallenges, { parameters: { USER_ID: userId } });
    result.rows.forEach((row) => {
      row.userParticipant = row.userParticipant[0]?.['$1'] === 'true';
      row.userActiveParticipant = row.userActiveParticipant[0]?.['$1'] === 'true';
    });
    return result.rows;
  }

  async findChallenge(challengeId: string, userId?: string) {
    const result = await this._query(queries.findChallenge, {
      parameters: { USER_ID: userId, CHALLENGE_ID: challengeId },
    });

    result.rows.forEach((row) => {
      row.userParticipant = row.userParticipant[0]?.['$1'] === 'true';
      row.userActiveParticipant = row.userActiveParticipant[0]?.['$1'] === 'true';
      row.problem = row.problem?.[0]?.['q4'];
    });

    return result.rows[0];
  }

  async findWinners(challengeId: string) {
    const result = await this._query(queries.findWinners, {
      parameters: { CHALLENGE_ID: challengeId },
    });

    return result.rows;
  }

  async findChallengeTeamFinishRanking(challengeId: string) {
    const result = await this._query(queries.findChallengeTeamFinishRanking, {
      parameters: { CHALLENGE_ID: challengeId },
    });

    return result.rows as {
      date: string;
      teamId: string;
    }[];
  }
  async addPointsToUser(userId: string, points: number) {
    await this._query(queries.addPointsToUser, {
      parameters: { USER_ID: userId, POINTS: points },
    });
  }
}

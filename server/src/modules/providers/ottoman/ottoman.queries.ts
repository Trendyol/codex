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
      row.problem = row.problem?.[0]?.["q4"]
    });

    return result.rows[0];
  }
}

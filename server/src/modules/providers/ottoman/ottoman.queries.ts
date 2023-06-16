import config from '@core/config/configuration';
import { UserChallenge } from '@core/data/entities';
import { QueryOptions, QueryResult } from 'couchbase';

import { queries } from './schemas/queries';

const bucketName = config.couchbase.bucketName;

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

  async findChallengeTeamFinishRankings(challengeId: string) {
    const result = await this._query(queries.findChallengeTeamFinishRankings, {
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

  async findChallengePlacements(challengeId: string) {
    const result = await this._query(queries.findChallengePlacements, {
      parameters: { CHALLENGE_ID: challengeId },
    });

    const placements = [];

    result.rows.forEach((row) => {
      const participants = row.participants.map((participant) => participant[bucketName]);
      placements.push({
        date: row.date,
        teamId: row.teamId,
        participants: participants,
      });
    });

    return placements;
  }

  async appendChallengeToUser(userId: string, challenge: UserChallenge) {
    await this._query(queries.appendChallengeToUser, {
      parameters: { USER_ID: userId, CHALLENGE: challenge },
    });
  }
  async appendProblemToUser(userId: string, problem: string) {
    await this._query(queries.appendProblemToUser, {
      parameters: { USER_ID: userId, PROBLEM: problem },
    });
  }

  async findProblems(userId: string) {
    const result = await this._query(queries.findProblems, {
      parameters: { USER_ID: userId },
    });

    const problems = [];

    result.rows.forEach((row) => {
      problems.push({
        ...row['q1'],
        solved: row.solved[0]?.['$1'],
      });
    });

    return problems;
  }
  async findProblemProgression(userId: string) {
    const result = await this._query(queries.findProblemProgression, {
      parameters: { USER_ID: userId },
    });

    return result.rows[0];
  }
  async findArticles() {
    const result = await this._query(queries.findArticles);

    const articles = result.rows.map((row) => {
      return {
        ...row['q1'],
        author: row.author[0],
      };
    });

    return articles;
  }
  async findDraftArticles(userId: string) {
    const result = await this._query(queries.findDraftArticles, {
      parameters: { USER_ID: userId },
    });

    const articles = result.rows.map((row) => {
      return {
        ...row['q1'],
        author: row.author[0],
      };
    });

    return articles;
  }

  async findArticle(articleId: string) {
    const result = await this._query(queries.findArticle, {
      parameters: { ARTICLE_ID: articleId },
    });
    const article = {
      ...result.rows[0]['q1'],
      author: result.rows[0]['author'][0],
    };

    return article;
  }
}

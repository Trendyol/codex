import { config } from '@core/config/configuration';
import { IDataService } from '@core/data/services/data.service';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { RoomGateway } from '../room/room.gateway';
import { SubmissionStatus, SubmissionTypes } from './models/enums';

type SubmissionResult = {
  time: number;
  memory: number;
  created_at: Date;
  status: {
    id: number;
    description: string;
  };
  stdout: string;
};
@Injectable()
export class SubmissionService {
  constructor(
    private readonly dataService: IDataService,
    private readonly roomGateway: RoomGateway,
  ) {}
  async run(code: string, language: number, testcaseId: string) {
    const { stdin, expected_output } = await this.dataService.testcases.findById(testcaseId);
    const result = await this.execute(code, language, stdin, expected_output);
    return {
      ...result,
      status: result.status.id,
      passedTestcases: 1,
      totalTestcases: 1,
      type: SubmissionTypes.Run,
    };
  }

  async submission(
    code: string,
    language: number,
    userId: string,
    problemId: string,
    teamId?: string,
    challengeId?: string,
  ) {
    // TODO: If team and challenge parameters are provided, check that the team and the challenge are valid
    const testcases = await this.dataService.testcases.find({ problemId });
    let passedTestcases = 0;
    let totalRuntime = 0;
    let totalMemory = 0;
    const date = new Date();

    for (const { stdin, expected_output } of testcases) {
      const result = await this.execute(code, language, stdin, expected_output);
      totalRuntime += result.runtime;
      totalMemory += result.memory;

      if (result.status.id !== SubmissionStatus.Accepted) {
        this.dataService.submissions.create({
          code,
          userId,
          problemId,
          teamId,
          challengeId,
          date,
          status: result.status.id,
        });

        return {
          ...result,
          status: result.status.id,
          passedTestcases,
          totalTestcases: testcases.length,
          type: SubmissionTypes.Submission,
        };
      }
      passedTestcases++;
    }

    const runtime = totalRuntime / testcases.length;
    const memory = totalMemory / testcases.length;

    this.dataService.submissions.create({
      code,
      userId,
      problemId,
      teamId,
      challengeId,
      runtime,
      memory,
      date,
      status: SubmissionStatus.Accepted,
    });

    return {
      status: SubmissionStatus.Accepted,
      type: SubmissionTypes.Submission,
      passedTestcases,
      totalTestcases: testcases.length,
      runtime,
      memory,
    };
  }

  async execute(code: string, language: number, stdin: string, expected_output: string) {
    try {
      const data = {
        language_id: language,
        source_code: code,
        stdin,
        expected_output,
      };
      const options = {
        method: 'POST',
        url: config.judge0.url,
        params: { base64_encoded: 'true', wait: 'true', fields: '*' },
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': config.judge0.key,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
        data,
      };

      const { time, memory, status, created_at, stdout } = (await axios.request(options))
        .data as SubmissionResult;

      return {
        memory,
        language,
        code,
        stdin,
        expected_output,
        status,
        stdout,
        created_at,
        runtime: time,
      };
    } catch (error) {
      console.error(error);
    }
  }

  findSubmissions(userId: string, problemId: string, teamId?: string) {
    const filter = { problemId, ...(teamId ? { teamId } : { userId }) };
    return this.dataService.submissions.find(filter, { limit: 20 });
  }
}

import { config } from '@core/config/configuration';
import { IDataService } from '@core/data/services/data.service';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

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
  constructor(private readonly dataService: IDataService) {}
  async run(code: string, language: number, testcaseId: string) {
    const { stdin, expected_output } = await this.dataService.testcases.findById(testcaseId);
    const result = await this.execute(code, language, stdin, expected_output);
    const passed = result.status.id == SubmissionStatus.Accepted;

    return {
      ...result,
      runtime: result.time,
      status: result.status.id,
      passedTestcases: passed ? 1 : 0,
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
    let runtime = 0;
    let memory = 0;
    let status = 0;
    const date = new Date();
    let latestTestcaseResult: SubmissionResult;

    for (const { stdin, expected_output } of testcases) {
      const result = await this.execute(code, language, stdin, expected_output);

      runtime += Number(result.time);
      memory += Number(result.memory);
      status = result.status.id;

      latestTestcaseResult = result;
      const passed = status == SubmissionStatus.Accepted;
      if (!passed) break;

      passedTestcases++;
    }

    this.dataService.submissions.create({
      code,
      userId,
      problemId,
      teamId,
      challengeId,
      runtime,
      memory,
      status,
      date,
    });

    return {
      ...latestTestcaseResult,
      status,
      passedTestcases,
      runtime,
      memory,
      totalTestcases: testcases.length,
      type: SubmissionTypes.Submission,
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
      const result = (await axios.request(options)).data as SubmissionResult;
      return {
        ...result,
        language,
        code,
        stdin,
        expected_output,
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

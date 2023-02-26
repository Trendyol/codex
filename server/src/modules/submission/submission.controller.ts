import { JwtGuard } from '@auth/guards/jwt.guard';
import { User } from '@core/decorators/user.decorator';
import { Body, Controller, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RunDto } from './dtos/run.dto';
import { SubmissionDto } from './dtos/submission.dto';
import { SubmissionService } from './submission.service';

@ApiTags('Submission')
@Controller('submission')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post('/:testcaseId/run')
  @UseGuards(JwtGuard)
  run(@Body() createRunDto: RunDto, @Param('testcaseId') testcaseId: string) {
    const { code, language } = createRunDto;
    return this.submissionService.run(code, language, testcaseId);
  }

  @Post('/:problemId')
  @UseGuards(JwtGuard)
  submission(
    @Body() createSubmissionDto: SubmissionDto,
    @Param('problemId') problemId: string,
    @Query('teamId') teamId: string,
    @Query('challengeId') challengeId: string,
    @User() user,
  ) {
    const { code, language } = createSubmissionDto;
    return this.submissionService.submission(
      code,
      language,
      user.id,
      problemId,
      teamId,
      challengeId,
    );
  }
}

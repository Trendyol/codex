import { AuthModule } from '@auth/auth.module';
import { ChallengeModule } from '@challenge/challenge.module';
import { DataModule } from '@data/data.module';
import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';

import { LobbyModule } from './modules/lobby/lobby.module';
import { ProblemModule } from './modules/problem/problem.module';
import { PublicationModule } from './modules/publication/publication.module';
import { RoomModule } from './modules/room/room.module';
import { SubmissionModule } from './modules/submission/submission.module';
import { TeamModule } from './modules/team/team.module';
import { TestcaseModule } from './modules/testcase/testcase.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    DataModule,
    ChallengeModule,
    LobbyModule,
    RoomModule,
    TeamModule,
    ProblemModule,
    SubmissionModule,
    TestcaseModule,
    PublicationModule,
  ],
})
export class AppModule {}

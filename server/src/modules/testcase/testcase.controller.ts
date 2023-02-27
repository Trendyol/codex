import { AdminGuard } from '@auth/guards/admin.guard';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateTestcaseDto } from './dtos/create-testcase.dto';
import { TestcaseService } from './testcase.service';

@ApiTags('Testcase')
@Controller('testcase')
export class TestcaseController {
  constructor(private readonly testcaseService: TestcaseService) {}
  @Post()
  @UseGuards(JwtGuard, AdminGuard)
  create(@Body() createTestcaseDto: CreateTestcaseDto) {
    return this.testcaseService.create(createTestcaseDto);
  }

  @Get()
  get(@Query('problemId') problemId: string) {
    return this.testcaseService.get(problemId);
  }
}

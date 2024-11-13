// src/reports/report.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ReportController } from './report.controller';
import { ReportsService } from './report.service';

describe('ReportController', () => {
  let controller: ReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportController],
      providers: [ReportsService], // Make sure to provide the service
    }).compile();

    controller = module.get<ReportController>(ReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

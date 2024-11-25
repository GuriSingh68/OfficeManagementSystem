import { Module } from '@nestjs/common';
import { ReportsService } from './report.service'; 
import { ReportController } from './report.controller';

@Module({
  controllers: [ReportController],
  providers: [ReportsService],
})
export class ReportsModule {}

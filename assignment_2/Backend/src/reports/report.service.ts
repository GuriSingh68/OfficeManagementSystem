// src/reports/report.service.ts
import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  private reports = []; // A simple in-memory storage for reports

  create(reportDto: CreateReportDto, filePath: string) {
    const report = { ...reportDto, filePath };
    this.reports.push(report);
    return report;
  }

  findAll() {
    return this.reports;
  }
}

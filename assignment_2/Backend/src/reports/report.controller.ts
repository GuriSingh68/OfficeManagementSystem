// src/reports/report.controller.ts
import { Controller, Post, UseInterceptors, UploadedFile, Body, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { ReportsService } from './report.service'; // Ensure correct path
import { CreateReportDto } from './dto/create-report.dto';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Ensure this folder exists
        filename: (req, file, callback) => {
          const fileExtension = file.originalname.split('.').pop();
          const newFileName = `${uuidv4()}.${fileExtension}`;
          callback(null, newFileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = ['application/pdf'];
        if (allowedTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('Only PDF files are allowed'), false);
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() reportDto: CreateReportDto) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const report = this.reportsService.create(reportDto, `uploads/${file.filename}`);
    return {
      message: 'File uploaded successfully',
      report,
    };
  }
}

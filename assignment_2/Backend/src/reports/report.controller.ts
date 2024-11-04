import { Controller, Post, UseInterceptors, UploadedFile, Body, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { ReportsService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';

@ApiTags('Reports')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiOperation({ summary: 'Upload a report file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Report file and metadata',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
          example: 'Monthly Report',
          description: 'Title of the report',
        },
        description: {
          type: 'string',
          example: 'This report covers the monthly summary.',
          description: 'Description of the report',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Only PDF files are allowed' })
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
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

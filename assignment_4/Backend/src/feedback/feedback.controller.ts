import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from 'src/guard/role.guard';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {}

    @ApiOperation({ summary: 'Submit feedback' })
    @ApiResponse({ status: 201, description: 'Feedback successfully submitted.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @Post('submit')
    @UseGuards(AuthGuard)
    async submitFeedback(@Body() feedbackDto: CreateFeedbackDto) {
        return this.feedbackService.createFeedback(feedbackDto);
    }

    @ApiOperation({ summary: 'Get all feedback' })
    @ApiResponse({ status: 200, description: 'Array of feedbacks.' })
    @Get()
    @UseGuards(AuthGuard)
    async getAllFeedback() {
        return this.feedbackService.findAllFeedback();
    }

    @ApiOperation({ summary: 'Get feedback by ID' })
    @ApiParam({ name: 'id', description: 'Feedback ID' })
    @ApiResponse({ status: 200, description: 'Feedback data.' })
    @ApiResponse({ status: 404, description: 'Feedback not found.' })
    @Get(':id')
    @UseGuards(AuthGuard)
    async getFeedbackById(@Param('id') id: string) {
        return this.feedbackService.findFeedbackById(id);
    }

    @ApiOperation({ summary: 'Update feedback' })
    @ApiParam({ name: 'id', description: 'Feedback ID' })
    @ApiBody({ type: CreateFeedbackDto })
    @ApiResponse({ status: 200, description: 'Feedback updated successfully.' })
    @ApiResponse({ status: 404, description: 'Feedback not found.' })
    @Patch(':id')
    @Roles('admin')
    @UseGuards(AuthGuard, RoleGuard)
    async updateFeedback(@Param('id') id: string, @Body() feedbackDto: CreateFeedbackDto) {
        return this.feedbackService.updateFeedback(id, feedbackDto);
    }

    @ApiOperation({ summary: 'Delete feedback' })
    @ApiParam({ name: 'id', description: 'Feedback ID' })
    @ApiResponse({ status: 200, description: 'Feedback deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Feedback not found.' })
    @Delete(':id')
    @Roles('admin')
    @UseGuards(AuthGuard, RoleGuard)
    async deleteFeedback(@Param('id') id: string) {
        return this.feedbackService.deleteFeedback(id);
    }
}

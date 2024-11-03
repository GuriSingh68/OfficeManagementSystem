import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './create-feedback.dto';


@Controller('feedback')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {}

    @Post('submit')
    async submitFeedback(@Body() feedbackDto: CreateFeedbackDto) {
        return this.feedbackService.createFeedback(feedbackDto);
    }

    @Get()
    async getAllFeedback() {
        return this.feedbackService.findAllFeedback();
    }

    @Get(':id')
    async getFeedbackById(@Param('id') id: string) {
        return this.feedbackService.findFeedbackById(id);
    }

    @Patch(':id')
    async updateFeedback(@Param('id') id: string, @Body() feedbackDto: CreateFeedbackDto) {
        return this.feedbackService.updateFeedback(id, feedbackDto);
    }

    @Delete(':id')
    async deleteFeedback(@Param('id') id: string) {
        return this.feedbackService.deleteFeedback(id);
    }
}

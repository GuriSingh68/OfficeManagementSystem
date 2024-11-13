import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback } from '../feedback/schema/feedback.schema';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
    constructor(@InjectModel(Feedback.name) private feedbackModel: Model<Feedback>) {}

    async createFeedback(feedbackDto: CreateFeedbackDto): Promise<Feedback> {
        const createdFeedback =  new this.feedbackModel(feedbackDto);
        return createdFeedback.save();
    }
3
    async findAllFeedback(): Promise<Feedback[]> {
        return this.feedbackModel.find().exec();
    }

    async findFeedbackById(id: string): Promise<Feedback> {
        const feedback = await this.feedbackModel.findById(id).exec();
        if (!feedback) {
            throw new NotFoundException(`Feedback with ID ${id} not found`);
        }
        return feedback;
    }

    async updateFeedback(id: string, feedbackDto: CreateFeedbackDto): Promise<Feedback> {
        const updatedFeedback = await this.feedbackModel.findByIdAndUpdate(id, feedbackDto, {
            new: true,
            runValidators: true,
        }).exec();
        if (!updatedFeedback) {
            throw new NotFoundException(`Feedback with ID ${id} not found`);
        }
        return updatedFeedback;
    }

    async deleteFeedback(id: string): Promise<{ message: string }> {
        const result = await this.feedbackModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Feedback with ID ${id} not found`);
        }
        return { message: 'Feedback deleted successfully' };
    }
}

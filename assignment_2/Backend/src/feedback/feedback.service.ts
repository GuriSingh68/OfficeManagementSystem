import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from './create-feedback.dto';

@Injectable()
export class FeedbackService {
    private feedbacks = [];

    createFeedback(feedbackDto: CreateFeedbackDto) {
        const newFeedback = { id: Date.now().toString(), ...feedbackDto }; // Assign a unique ID
        this.feedbacks.push(newFeedback);
        return newFeedback; // Return the created feedback
    }

    findAllFeedback() {
        return this.feedbacks;
    }

    findFeedbackById(id: string) {
        const feedback = this.feedbacks.find(item => item.id === id);
        if (!feedback) {
            throw new NotFoundException(`Feedback with ID ${id} not found`);
        }
        return feedback;
    }

    updateFeedback(id: string, feedbackDto: CreateFeedbackDto) {
        const feedbackIndex = this.feedbacks.findIndex(item => item.id === id);
        if (feedbackIndex === -1) {
            throw new NotFoundException(`Feedback with ID ${id} not found`);
        }
        const updatedFeedback = { ...this.feedbacks[feedbackIndex], ...feedbackDto };
        this.feedbacks[feedbackIndex] = updatedFeedback;
        return updatedFeedback;
    }

    deleteFeedback(id: string) {
        const feedbackIndex = this.feedbacks.findIndex(item => item.id === id);
        if (feedbackIndex === -1) {
            throw new NotFoundException(`Feedback with ID ${id} not found`);
        }
        this.feedbacks.splice(feedbackIndex, 1);
        return { message: 'Feedback deleted successfully' };
    }
}

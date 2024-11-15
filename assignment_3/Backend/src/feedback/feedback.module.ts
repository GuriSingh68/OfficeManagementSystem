import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Feedback, FeedbackSchema } from './schema/feedback.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Feedback.name, schema: FeedbackSchema }]),
    ],
    controllers: [FeedbackController],
    providers: [FeedbackService],
})
export class FeedbackModule {}
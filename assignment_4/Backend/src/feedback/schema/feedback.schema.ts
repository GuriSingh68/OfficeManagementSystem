import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Feedback extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    feedbackText: string;

    @Prop({ required: true, min: 1, max: 5 })
    rating: number;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);

import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateFeedbackDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    feedbackText: string;

    @IsNotEmpty()
    @IsNumber()
    rating: number;
}

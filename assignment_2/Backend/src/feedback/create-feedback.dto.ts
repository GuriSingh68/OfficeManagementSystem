import { IsNotEmpty, IsString, IsNumber, IsInt, Min, Max } from 'class-validator';

export class CreateFeedbackDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    feedbackText: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;
}

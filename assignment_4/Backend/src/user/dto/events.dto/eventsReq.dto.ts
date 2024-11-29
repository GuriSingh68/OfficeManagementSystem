// events-req.dto.ts
import { IsNotEmpty, IsString, IsBoolean, IsDateString, IsArray, IsOptional, IsUrl, MaxLength, ArrayNotEmpty } from "class-validator";

export class EventsReqDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    startDate: string;

    @IsNotEmpty()
    endDate: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    attendeesEmails: string[];

    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @IsNotEmpty()
    @IsBoolean()
    isOnline: boolean;

    @IsOptional()
    @IsUrl()
    eventLink?: string;
}

import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class AddTaskDto {
    @IsNotEmpty()
    @IsString()
    taskName: string;
    @IsNotEmpty()
    assignee:string;
    @IsNotEmpty()
    @IsString()
    assigned:string;
    @IsNotEmpty()
    @IsString()
    start_date:string;
    @IsNotEmpty()
    @IsString()
    end_date:string;
    @IsNotEmpty()
    @IsString()
    project:string;
    @IsNotEmpty()
    priority:"high" | "moderate" | "low";
    @IsNotEmpty()
    @IsString()
    description:string
}
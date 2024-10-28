import { IsDate, IsNotEmpty } from "class-validator";

export class AddTaskDto {
    @IsNotEmpty()
    taskName: string;
    @IsNotEmpty()
    assignee:string;
    @IsNotEmpty()
    assigned:string;
    @IsNotEmpty()
    start_date:string;
    @IsNotEmpty()
    end_date:string;
    @IsNotEmpty()
    project:string;
    @IsNotEmpty()
    priority:"high" | "moderate" | "low";
    @IsNotEmpty()
    description:string
}
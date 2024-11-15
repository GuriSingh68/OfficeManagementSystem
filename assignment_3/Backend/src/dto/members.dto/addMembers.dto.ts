import { Prop } from '@nestjs/mongoose';
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AddMembersDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsInt()
    empId: string; 

    @IsNotEmpty()
    @IsEmail()
    emailId: string;

    @IsNotEmpty()
    @IsString()
    team: string;

    @IsNotEmpty()
    @IsString()
    manager: string;

    @IsEnum({ required: true, enum: ["admin", "manager", "user"], default: "user" })
  role: string;

}

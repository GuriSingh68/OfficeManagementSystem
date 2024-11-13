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

    @Prop({ required: true, enum: ["admin", "manager", "Employee"], default: "Employee" })
  role: string;

}

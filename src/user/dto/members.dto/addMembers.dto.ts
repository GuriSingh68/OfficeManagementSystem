import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";

export class AddMembersDto {
    // @IsNotEmpty() @IsString()
     name: string;
    // @IsNotEmpty() @IsInt() 
    empId: number;  // Renamed from employeeId to empId
    // @IsNotEmpty() @IsString()
     team: string;
    // @IsNotEmpty() @IsEmail()
     email: string;
    // @IsNotEmpty() @IsString()
     manager: string;
    // @IsNotEmpty() 
    role: "admin" | "manager" | "employee"
  }
  
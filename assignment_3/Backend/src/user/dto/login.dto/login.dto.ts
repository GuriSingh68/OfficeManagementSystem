import { IsEmail, IsEmpty, IsNotEmpty } from "class-validator";


export class LoginDto {
    @IsEmail({},{message:"invalid Email Format"})
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    password:string
}

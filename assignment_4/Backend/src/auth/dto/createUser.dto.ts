import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
   @IsNotEmpty({ message: "First name is required" })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: "Last name is required" })
  lastName: string;

  @IsEmail()
  @IsNotEmpty({ message: "Email required" })
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
    @IsEnum(["admin", "user", "manager"], { message: "role must be one of admin, user, or manager" })
    role: string;
}

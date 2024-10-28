import { IsString, IsEmail, IsMobilePhone, IsDateString, IsNotEmpty } from 'class-validator';

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsMobilePhone('en-CA') // You can specify locale if needed, e.g., 'en-US'
    mobile: string; // Change to string for better phone number handling

    @IsNotEmpty()
    @IsDateString()
    dob: Date;

    @IsNotEmpty()
    @IsString()
    password: string;
}

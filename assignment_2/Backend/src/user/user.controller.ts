import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/login.dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

   constructor(readonly userService:UserService) {};

   @Post('login')
   @HttpCode(HttpStatus.OK)
   login(@Body(ValidationPipe) loginDto: LoginDto){
       return {
      message: 'Login Successful',
      user: {
         email: loginDto.email
      }
   };
   }

   @Post("sign-up")
   async signUp(@Body(ValidationPipe) signUpDto: SignUpDto){
       const newUser = await this.userService.create(signUpDto);
       return {
         message: 'User Created Successfully',
         newUser: newUser.id
      };
   }
}

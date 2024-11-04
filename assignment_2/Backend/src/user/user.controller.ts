import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/login.dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';
import { UserService } from './user.service';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'User login' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, description: 'Login successful' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async login(@Body(ValidationPipe) loginDto: LoginDto) {
        const user = await this.userService.validateUser(loginDto);
        return {
            message: 'Login Successful',
            user: {
                email: user.email
            },
        };
    }

    @Post('sign-up')
    @ApiOperation({ summary: 'User registration' })
    @ApiBody({ type: SignUpDto })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 409, description: 'User with this email already exists' })
    async signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
        const newUser = await this.userService.create(signUpDto);
        return {
            message: 'User Created Successfully',
            userId: newUser.id
        };
    }
}

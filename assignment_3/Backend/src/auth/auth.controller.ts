import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { RoleGuard } from 'src/guard/role.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('signup')
    async signup(@Body() signup: SignUpDto) {
        await this.authService.signup(signup);
        return {
            message: "User created Successfully",
            statusCode: HttpStatus.CREATED
        }
    }
    @Post('login')
    async login(@Body(ValidationPipe) cred: LoginDto) {
        return this.authService.login(cred);

    }
    @Post("token")
    async storeRefreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto.refreshToken);
    }

}

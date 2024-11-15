import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create a new user account' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Validation errors' })
  async signup(@Body() signup: SignUpDto) {
    await this.authService.signup(signup);
    return {
      message: 'User created Successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login to the application' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body(ValidationPipe) cred: LoginDto) {
    return this.authService.login(cred);
  }

  @Post('token')
  @ApiOperation({ summary: 'Refresh an expired access token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, description: 'Access token refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async storeRefreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }
}

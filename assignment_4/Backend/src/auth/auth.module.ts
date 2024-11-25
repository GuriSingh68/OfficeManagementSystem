import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Schema/Users.schema';
import { RefreshToken, RefreshTokenSchema } from './Schema/Refresh.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: RefreshToken.name, schema: RefreshTokenSchema }]),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }

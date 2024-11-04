import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Signup, SignupSchema } from './schema/signup.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Signup.name, schema: SignupSchema }]),
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}

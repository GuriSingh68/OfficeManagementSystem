import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';
import { LoginDto } from './dto/login.dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Signup } from './schema/signup.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(Signup.name) private readonly signUpModel: Model<Signup>) {}

    async create(signUpDto: SignUpDto) {
        const existingUser = await this.signUpModel.findOne({ email: signUpDto.email }).exec();
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }
        const newUser = new this.signUpModel(signUpDto);
        await newUser.save();
        return newUser;
    }

    async validateUser(loginDto: LoginDto) {
        const user = await this.signUpModel.findOne({ email: loginDto.email }).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
}

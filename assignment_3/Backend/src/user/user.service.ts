import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/Schema/Users.schema';
import { UpdateUserDto } from './dto/userDto/updateUser.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
    async findAll() {
        return this.userModel.find().exec();
    }
    async findByEmail(email: string) {
        return this.userModel.findOne({ email }).exec();
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        Object.assign(user, updateUserDto);
        return user.save();
    }
    async remove(id: string) {
        const user = await this.userModel.findByIdAndDelete(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
}

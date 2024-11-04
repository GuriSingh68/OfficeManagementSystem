import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { AddMembersDto } from 'src/user/dto/members.dto/addMembers.dto';
import { Member } from './schema/addMember.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/task/schemas/task.schema';
import { error } from 'console';

@Injectable()
export class AddMembersService {
    // private members: AddMembersDto[] = [];
    constructor(@InjectModel(Member.name) private readonly membersModel: Model<Member>) {}
    async findAll() {
        return this.membersModel.find().limit(10).exec();
    }

    async findOneByEmpId(empId: string): Promise<Member> {
        const member = await this.membersModel.findOne({ empId });
        if (!member) {
            throw new NotFoundException('Member not found');
        }
        return member;
    }

   async create(user: AddMembersDto):Promise<Member> {
       const addMem=new this.membersModel(user);
       return await addMem.save();
    }

   async update(empId: string, user: AddMembersDto) {
        const update=await this.membersModel.findOneAndUpdate({empId:empId},{$set:user},{new:true}).exec();
        if(!update)
            throw new NotFoundException("User not found")
        return update;
    }

    async deleteByEmpId(empId: string) {
        const member = await this.membersModel.findOneAndDelete({ empId }).exec();
        if (!member) throw new NotFoundException('User not found');
        
        return member;
    }
}
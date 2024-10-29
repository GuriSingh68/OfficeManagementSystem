import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { AddMembersDto } from 'src/user/dto/members.dto/addMembers.dto';

@Injectable()
export class AddMembersService {
    private members: AddMembersDto[] = [];
    findAll(): AddMembersDto[] {
        return this.members;
    }

    findOneById(id: number): AddMembersDto | undefined {

        const userExist = this.members.find(user => user.empId === id);

        if (userExist) {
            return userExist;
        }

        throw new NotFoundException(`Employee Id not found: ${id}`);
    }

    create(user: AddMembersDto): AddMembersDto | undefined {
        const userExist=this.members.find(mem => mem.empId===user.empId)
        if(userExist){
             throw new ConflictException(`User already exist ${user.empId}`)
        }
        this.members.push(user);
        return user;
    }

    update(id: number, user: AddMembersDto): AddMembersDto | undefined {
        const index = this.members.findIndex(u => u.empId === id);
        if (index !== -1) {
            this.members[index] = user;
            return user;
        }
        throw new NotFoundException(`Employee ID ${id} not found.`);
    }

    delete(id: number): void {
        const index = this.members.findIndex(u => u.empId === id);
        if (index !== -1) {
            this.members.splice(index, 1);
        }
    }
}
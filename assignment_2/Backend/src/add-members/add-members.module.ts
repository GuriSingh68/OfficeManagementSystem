import { Module } from '@nestjs/common';
import { AddMembersController } from './add-members.controller';
import { AddMembersService } from './add-members.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/task/schemas/task.schema';
import { Member, AddMemberSchema } from './schema/addMember.schema';

@Module({imports: [
  MongooseModule.forFeature([{ name: Member.name, schema: AddMemberSchema }]),
],
  controllers: [AddMembersController],
  providers: [AddMembersService]
})
export class AddMembersModule {}

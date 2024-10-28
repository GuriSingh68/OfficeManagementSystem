import { Module } from '@nestjs/common';
import { AddMembersController } from './add-members.controller';
import { AddMembersService } from './add-members.service';

@Module({
  controllers: [AddMembersController],
  providers: [AddMembersService]
})
export class AddMembersModule {}

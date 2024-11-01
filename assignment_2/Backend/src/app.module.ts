import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AddMembersModule } from './add-members/add-members.module';
import { TaskModule } from './task/task.module';
import { EventsModule } from './events/events.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UserModule, AddMembersModule, TaskModule, EventsModule,MongooseModule.forRoot('mongodb://localhost:27017/OfficeManagement'),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

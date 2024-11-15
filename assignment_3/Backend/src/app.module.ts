import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AddMembersModule } from './add-members/add-members.module';
import { TaskModule } from './task/task.module';
import { EventsModule } from './events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportsModule } from './reports/report.module';
import { FeedbackModule } from './feedback/feedback.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';
import { UserModule } from './user/user.module';

@Module({
  imports: [JwtModule.register({
     global:true,
    secret:"123"
  }),AuthModule, AddMembersModule, TaskModule, EventsModule,ReportsModule,FeedbackModule,TaskModule,UserModule,MongooseModule.forRoot('mongodb://localhost:27017/OfficeManagement'),],
  controllers: [AppController],
  providers: [AppService,
  AuthGuard,RoleGuard],
})
export class AppModule {}

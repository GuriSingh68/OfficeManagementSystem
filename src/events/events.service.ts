import { Injectable } from '@nestjs/common';
import { EventsReqDto } from 'src/user/dto/events.dto/eventsReq.dto';
import { EventsResDto } from 'src/user/dto/events.dto/eventsRes.dto';

@Injectable()
export class EventsService {

    private events:EventsResDto[]=[];
    private taskId=1;
    findAll(){

        return this.events
    }
    findById(id:number){
        const events=this.events.find(user => user.taskId===id);
        return events;
    }
    create(events:EventsReqDto):EventsResDto {
        const newTask:EventsResDto = {
            taskId:this.taskId,
            message:"Event Created Successfully",
            ...events
        }
        this.taskId+=1
        this.events.push(newTask);
        return newTask
    }
}

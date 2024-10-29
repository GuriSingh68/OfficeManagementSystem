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
    update(id:number, eventsReqDto:EventsReqDto) : EventsResDto | null {
        const index=this.events.findIndex(event => event.taskId===id);
        if(index===-1){
            return null
        }
        const updatedEvent: EventsResDto = {
            ...this.events[index], 
            ...eventsReqDto, 
        };
        this.events[index] = updatedEvent;

        return updatedEvent;
    }
    delete(id: number): string | null {
        const eventIndex = this.events.findIndex(event => event.taskId === id);
        if (eventIndex === -1) {
            return null; 
        }
        this.events.splice(eventIndex, 1);

        return "Deleted Successfully";
    }
}

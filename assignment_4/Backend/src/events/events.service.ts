import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { Model } from 'mongoose';
import { EventsReqDto } from 'src/user/dto/events.dto/eventsReq.dto';
import { EventsResDto } from 'src/user/dto/events.dto/eventsRes.dto';

@Injectable()
export class EventsService {
    constructor(@InjectModel(Event.name) private readonly eventsModel: Model<Event>){}
   async findAll(){
        const events=await this.eventsModel.find().limit(10).exec();
        if(!events)
            throw new NotFoundException("No Data found")
        return events;
    }
   async findById(_id:string){
        const events=await this.eventsModel.findById(_id);
        if(!events)
            throw new NotFoundException("Data not found")
        return events;
    }
    async create(events:EventsReqDto) {
        const event=new this.eventsModel(events);
        return await event.save();
    }
    async update(id:string, eventsReqDto:EventsReqDto)  {
       const e=await this.eventsModel.findByIdAndUpdate({_id:id},{$set:eventsReqDto},{new:true});
       if(!e)
            throw new Error("Not able to update")
        return e;
    }
    async delete(id: string) {
        const event=await this.eventsModel.findByIdAndDelete({_id:id});
        return event;
    }
}

import { Body, Controller, ValidationPipe, Post, Get, Query, Param, Patch, Delete } from '@nestjs/common';
import { EventsReqDto } from 'src/user/dto/events.dto/eventsReq.dto';
import { EventsService } from './events.service';
import { EventsResDto } from 'src/user/dto/events.dto/eventsRes.dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags("Events")
@Controller('events')
export class EventsController {
    constructor(private readonly eventService: EventsService) { }
    @Get()
    @ApiResponse({ status: 200, description: 'Retrieve all events.' })
    async findAll() {
        return this.eventService.findAll();
    }
    @Get(":id")
    @ApiParam({ name: 'id', required: true, description: 'Task ID' })
    @ApiResponse({ status: 200, description: 'Retrieve a task by ID.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    async findById(@Param("id")id:string) {
        return this.eventService.findById(+id);
    }
    @Post()
    @ApiBody({type:EventsReqDto})
    @ApiResponse({status:201, description:"Event Created Successfully"})
    async create(@Body(ValidationPipe) eventsDto: EventsReqDto): Promise<EventsResDto> {
        const events = await this.eventService.create(eventsDto);
        return events;
    }
    @Patch(":id")
    @ApiBody({type:EventsReqDto})
    @ApiResponse({status:201, description:"Update  Successful"})
    async update(@Param("id") id:string,@Body() eventsReqDto:EventsReqDto): Promise<String | null>{
        const updated=this.eventService.update(+id,eventsReqDto);
        return "Updated Successfully";
    }
    @Delete(":id")
    @ApiResponse({status:201, description:"Deletion Successfully"})
    async delete(@Param("id") id:string): Promise<String | null> {
        const deleteEvent=this.eventService.delete(+id);
        return "Deleted Succesfully"
    }
}

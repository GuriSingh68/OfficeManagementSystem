import { Body, Controller, ValidationPipe, Post, Get, Query, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { EventsReqDto } from 'src/user/dto/events.dto/eventsReq.dto';
import { EventsService } from './events.service';
import { EventsResDto } from 'src/user/dto/events.dto/eventsRes.dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from 'src/guard/role.guard';

@ApiTags("Events")
@Controller('events')

export class EventsController {
    constructor(private readonly eventService: EventsService) { }
    @Get()
    @UseGuards(AuthGuard)
    @ApiResponse({ status: 200, description: 'Retrieve all events.' })
    async findAll() {
        const list=await this.eventService.findAll();
        if(list.length==0){
            return {
                message:"No events in the list"
            }
        }
		return list;
    }
    @Get(":_id")
    @UseGuards(AuthGuard) 
    @ApiParam({ name: 'id', required: true, description: 'Task ID' })
    @ApiResponse({ status: 200, description: 'Retrieve a task by ID.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    async findById(@Param("id")_id:string) {
        const user=await this.eventService.findById('_id');
        if(!user){
            return {
                message:"User not found"
            }
        }
		return user;
    }
    @Post()
    @Roles('admin','manager')
    @UseGuards(AuthGuard, RoleGuard)
    @ApiBody({type:EventsReqDto})
    @ApiResponse({status:201, description:"Event Created Successfully"})
    async create(@Body(ValidationPipe) eventsDto: EventsReqDto): Promise<any> {
        const events = await this.eventService.create(eventsDto);
        return events;
    }
    @Patch(":id")
    @Roles('admin','manager')
    @UseGuards(AuthGuard, RoleGuard)
    @ApiBody({type:EventsReqDto})
    @ApiResponse({status:201, description:"Update  Successful"})
    async update(@Param("id") id:string,@Body() eventsReqDto:EventsReqDto): Promise<String | null>{
        const updated=await this.eventService.update(id,eventsReqDto);
        return `Event Updated Successfully - ${updated.timeStamp}`
    }
    @Delete(":id")
    @Roles('admin')
    @UseGuards(AuthGuard, RoleGuard)
    @ApiResponse({status:201, description:"Deletion Successfully"})
    async delete(@Param("id") id:string): Promise<String | null> {
        const deleteEvent=await this.eventService.delete(id);
        return "Deleted Succesfully"
    }
}

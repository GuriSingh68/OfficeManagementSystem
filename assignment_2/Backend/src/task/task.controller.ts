import { Body, Controller, Get, ValidationPipe, Post, HttpCode, HttpStatus, Param, Patch, Delete, NotFoundException } from '@nestjs/common';
import { AddTaskDto } from 'src/user/dto/addTask.dto/addTask.dto';
import { ResponseTaskDto } from 'src/user/dto/addTask.dto/responseTask.dto';
import { TaskService } from './task.service';
import { MESSAGES } from '@nestjs/core/constants';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@ApiTags("task")
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }
    @Get()
    @ApiOperation({summary:"Gettig list of all tasks"})
    @ApiResponse({
        status:200,
        description:"Task list",
        type:String
    })
    async findAll() {
        return this.taskService.findAll();
    }
    @Get(":id")
    @ApiOperation({summary:"Gettig taks by Id"})
    @ApiResponse({
        status:200,
        description:"Task by Id",
        type:String
    })
    async findById(@Param("id") id:string){
        return this.taskService.findById(+id);
    }
    @Post("create")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary:"Creating Task"})
    @ApiResponse({
        status: 201,
        description: 'The task has been successfully created',
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Task Created Successfully',
                },
                taskId: {
                    type: 'number',
                    example: 1,
                },
            },
        },
    })
    async create(@Body(ValidationPipe) taskDto: AddTaskDto) {
        const task = await this.taskService.create(taskDto);
        return {
            message: 'Task Created Successfully',
            taskId:task.id,

        };
    }
    @Patch(':id')
    @ApiOperation({ summary: 'Update a task' })
    @ApiParam({ name: 'id', type: 'string', description: 'ID of the task to update' })
    @ApiResponse({ status: 200, description: 'Task updated successfully', type: ResponseTaskDto })
    @ApiResponse({ status: 404, description: 'Task not found' })
    async update(@Param("id") id:string,@Body() addTaskDto:AddTaskDto): Promise< ResponseTaskDto | null>{
        // const updated=this.eventService.update(+id,eventsReqDto);
        const update=this.taskService.update(+id,addTaskDto);
       if(update)
       {
        return update
       }
       throw new Error("Not found");
    }
    @Delete(":id")
    @ApiOperation({ summary: 'Delete a task' })
    @ApiParam({ name: 'id', type: 'string', description: 'ID of the task to delete' })
    @ApiResponse({ status: 200, description: 'Task deleted successfully', type: ResponseTaskDto })
    @ApiResponse({ status: 404, description: 'Task not found' })
    async delete(@Param("id")id:string): Promise <ResponseTaskDto | null>{
        const deleteTask = this.taskService.delete(+id); // Convert id to number
    if (!deleteTask) {
        throw new NotFoundException('Task not found'); // Throw a NotFoundException if task not found
    }
    return deleteTask;
}
}

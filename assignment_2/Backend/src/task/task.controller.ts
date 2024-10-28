import { Body, Controller, Get, ValidationPipe, Post, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { AddTaskDto } from 'src/user/dto/addTask.dto/addTask.dto';
import { ResponseTaskDto } from 'src/user/dto/addTask.dto/responseTask.dto';
import { TaskService } from './task.service';
import { MESSAGES } from '@nestjs/core/constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
}

import { Body, Controller, Get, ValidationPipe, Post, HttpCode, HttpStatus, Param, Patch, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { AddTaskDto } from 'src/user/dto/addTask.dto/addTask.dto';
import { TaskService } from './task.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from 'src/guard/role.guard';

@ApiTags("task")
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: "Getting list of all tasks" })
    @ApiResponse({
        status: 200,
        description: "Task list",
        type: String,
    })
    async findAll() {
        return this.taskService.findAll();
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: "Getting task by Id" })
    @ApiResponse({
        status: 200,
        description: "Task by Id",
        type: String,
    })
    async findById(@Param("id") id: string) {
        return this.taskService.findById(id); 
    }
    @Post("create")
    @Roles('admin')
    @UseGuards(AuthGuard, RoleGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Creating Task" })
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
                    type: 'string', 
                    example: 'abc123', 
                },
            },
        },
    })
        async create(@Body(ValidationPipe) taskDto: AddTaskDto) {
        const task = await this.taskService.create(taskDto);
        return {
            message: 'Task Created Successfully',
            taskId: task.id,
        };
    }

    @Patch(':id')
    @Roles('admin')
    @UseGuards(AuthGuard, RoleGuard)
    @ApiOperation({ summary: 'Update a task' })
    @ApiParam({ name: 'id', type: 'string', description: 'ID of the task to update' })
    @ApiResponse({ status: 200, description: 'Task updated successfully' })
    @ApiResponse({ status: 404, description: 'Task not found' })
    async update(@Param("id") id: string, @Body() addTaskDto: AddTaskDto):Promise<String> {
        const update = await this.taskService.update(id, addTaskDto); 
        return `Update Successful - ${addTaskDto.taskName}`; 
    }

    @Delete(":id")
    @Roles('admin')
    @UseGuards(AuthGuard, RoleGuard)
    @ApiOperation({ summary: 'Delete a task' })
    @ApiParam({ name: 'id', type: 'string', description: 'ID of the task to delete' })
    @ApiResponse({ status: 200, description: 'Task deleted successfully' })
    @ApiResponse({ status: 404, description: 'Task not found' })
    async delete(@Param("id") id: string):Promise<String> {
        const deleteTask = await this.taskService.delete(id); 
        return `Task deleted successfully - ${deleteTask.taskName}`; 
    }
}

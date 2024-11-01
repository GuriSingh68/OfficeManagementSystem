import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AddTaskDto } from 'src/user/dto/addTask.dto/addTask.dto';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';
import { customAlphabet } from "nanoid";

@Injectable()
export class TaskService {

    constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) {}

    async findAll() {
        return this.taskModel.find().limit(10).exec();
    }

    async findById(id: string): Promise<Task> {
        const task = await this.taskModel.findById(id);
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }

    async create(taskDto: AddTaskDto) {
        const createdTask = new this.taskModel(taskDto); 
        return await createdTask.save();
    }

    async update(id: string, addTaskDto: AddTaskDto) {
        const updatedTask = await this.taskModel
            .findOneAndUpdate({ _id: id }, { $set: addTaskDto }, { new: true })
            .exec();
        if (!updatedTask) {
            throw new NotFoundException("Task not found");
        }
        return updatedTask;
    }

    async delete(id: string) {
        const deletedTask = await this.taskModel.findOneAndDelete({_id: id }).exec();
        if (!deletedTask) {
            throw new NotFoundException("Task not found");
        }
        return deletedTask;
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { create } from 'domain';
import { AddTaskDto } from 'src/user/dto/addTask.dto/addTask.dto';
import { ResponseTaskDto } from 'src/user/dto/addTask.dto/responseTask.dto';

@Injectable()
export class TaskService {
    // private task: {id:number; task: AddTaskDto}[]=[];
    private tasks: ResponseTaskDto[]=[]
    private current:number=1;

    findAll() {
       return this.tasks;
    }
    findById(taksId:number){
        const res=this.tasks.find(user => user.id===taksId);
        if(!res){
            throw new NotFoundException("Task Id not found")
        }
        return res;
    }
    
    create(task:AddTaskDto):ResponseTaskDto {
        const newTask : ResponseTaskDto = { 
            id:this.current,
            ...task
        }
        this.tasks.push(newTask);
        this.current++;
        return newTask;
    }
    
  update(id:number,addTaskDto:AddTaskDto): ResponseTaskDto | null{
    const taskIndex=this.tasks.findIndex(task => task.id===id);
    if(taskIndex===-1){
        return null;
    }
    const updatedTask: ResponseTaskDto = {
        id:this.tasks[taskIndex].id,
        ...this.tasks[taskIndex], 
        ...addTaskDto, 
    };
    this.tasks[taskIndex] = updatedTask;
    return updatedTask
  }
  delete(id: number): ResponseTaskDto | null {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return null; 
    }

    const deletedTask = this.tasks[taskIndex]; 
    this.tasks.splice(taskIndex, 1); 
    return deletedTask;
  }
}

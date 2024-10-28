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
    
  
}

import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';

@Injectable()
export class UserService {
    private users=[];
    create(signUp:SignUpDto){
        const existingUser=this.users.find(
            user => user.email===signUp.email
        )
        if(existingUser){
            throw new Error("User Already Exists")
        }
        const newUser = {
            ...signUp,
            id: this.users.length + 1, // Simple ID generation
        };

        this.users.push(newUser);
        
        return newUser;
    }
}

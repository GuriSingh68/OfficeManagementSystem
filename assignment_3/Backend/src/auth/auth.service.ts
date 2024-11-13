import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Schema/Users.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import {v4 as uuid4} from 'uuid'
import * as bcrypt from "bcrypt"
import { LoginDto } from './dto/login.dto';
import { RefreshToken } from './Schema/Refresh.schema';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel:Model<User>,@InjectModel(RefreshToken.name) private refreshTokenModel:Model<RefreshToken>,private jwtService:JwtService){}

    async signup(signupData:SignUpDto){
        const {firstName,lastName,dob,email,mobile,role}=signupData;
        const userExist=await this.userModel.findOne({email:signupData.email});
        if(userExist){
            throw new BadRequestException("User already exists");
        }
        const hashedPassword=await bcrypt.hash(signupData.password,10);
        await this.userModel.create({
            firstName,lastName,dob,email,mobile,password:hashedPassword,role
        });
    }
    async login(credentials:LoginDto){
        const {email,password}= credentials;
        const userExist= await this.userModel.findOne({email:email})
        if(!userExist){
            throw new UnauthorizedException("Invalid credentials")
        }
        const matchPassword=await bcrypt.compare(password,userExist.password);
        if(!matchPassword){
            throw new UnauthorizedException("Invalid credentials")
        }
        return this.generateJWTtoken(userExist._id,userExist.role)
    }
    async generateJWTtoken(userId, role: string){
        const accessToken= await this.jwtService.sign({userId,role},{expiresIn:"1hr"})
        const refreshToken=uuid4();
        await this.storeRefreshToken(refreshToken,userId)
        return {refreshToken,accessToken};
    }
    async refreshToken(refreshToken:string){
        const token= await this.refreshTokenModel.findOne({refreshToken:refreshToken});
        
        if(!token){
            throw new UnauthorizedException("Invalid")
        }
        const user=await this.userModel.findOne(token.userId)
        return this.generateJWTtoken(user._id,user.role)
    }
    async storeRefreshToken(refreshToken:string,userId:string){
        const expiryDate=new Date();
        expiryDate.setDate(expiryDate.getDate()+3);
        await this.refreshTokenModel.updateOne({userId},{$set:{expiryDate,refreshToken}},{
            upsert:true
        });
    }
}

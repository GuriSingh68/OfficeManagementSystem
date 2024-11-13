
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
@Schema()
export class User extends Document{
    @Prop({required:true})
    firstName:string
    @Prop({required:true})
    lastName:string
    @Prop({required:true,unique:true})
    email:string
    @Prop({required:true})
    mobile:string
    @Prop({required:true})
    dob:Date
    @Prop({required:true})
    password:string
    @Prop({
        required: true,
        enum: ['admin', 'user',"manager"],
      })
      role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
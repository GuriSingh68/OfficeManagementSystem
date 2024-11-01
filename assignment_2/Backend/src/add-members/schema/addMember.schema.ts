import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Member extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true,unique:true })
    empId: string;

    @Prop({ required: true })
    emailId: string;

    @Prop({ required: true })
    team: string;

    @Prop({ required: true})
    manager: string;

    @Prop({ required: true, enum: ["admin", "manager", "Employee"], default: "Employee" })
    role: string;
}
export const AddMemberSchema = SchemaFactory.createForClass(Member);
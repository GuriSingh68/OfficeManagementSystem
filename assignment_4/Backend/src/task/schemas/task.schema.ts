import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Task extends Document {
    @Prop({ required: true })
    taskName: string;

    @Prop({ required: true })
    assignee: string;

    @Prop({ type: [String], required: true })
    assigned: string[];

    @Prop({ required: true })
    start_date: Date;

    @Prop({ required: true })
    end_date: string;

    @Prop({ required: true })
    project: string;

    @Prop({ required: true, enum: ["high", "moderate", "low"] })
    priority: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true, enum: ["pending", "done", "In Progress"], default: "pending" })
    status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
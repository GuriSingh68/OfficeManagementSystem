// events.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Event extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    startDate: string;

    @Prop({ required: true }) 
    endDate: string;

    @Prop({ type: [String], required: true })
    attendeesEmails: string[];

    @Prop({ required: false, maxlength: 500 })
    description: string;

    @Prop({ required: true, default: false })
    isOnline: boolean;

    @Prop({ required: false })
    eventLink: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);

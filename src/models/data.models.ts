import { prop, Typegoose } from 'typegoose';
import { CurrentBookings } from "../models/currentBookings.model";
import { Facilitator } from "../models/facilitator.model";
import { TeacherPreference } from "../models/teacherPreference.model";

export class Data extends Typegoose {

  @prop({ required: true })
  public currentBookings!: CurrentBookings[];

  @prop({ required: true })
  public facilitator!: Facilitator;

  @prop({ required: true })
  public teacherPreference!: TeacherPreference[];
}

export const DataModel = new CurrentBookings().getModelForClass(Data);

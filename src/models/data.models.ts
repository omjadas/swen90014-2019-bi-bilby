import { prop, Typegoose } from 'typegoose';
import { CurrentBookings } from "../models/currentBookings.model";
import { Facilitator } from "../models/facilitator.model";
import { TeacherPreference } from "../models/teacherPreference.model";
import { Workshop } from './workshop';
import { Locations } from './locations';
import { User } from './user';

export class Data extends Typegoose {

  @prop({ required: true })
  public currentBookings!: CurrentBookings[];

  @prop({ required: true })
  public facilitator!: Facilitator[];

  @prop({ required: true })
  public teacherPreference!: TeacherPreference[];

  @prop({required: true})
  public workshop!: Workshop;

  @prop({required: true})
  public locations!: Locations[];

  @prop({required: true})
  public user!: User[];
}

export const DataModel = new CurrentBookings().getModelForClass(Data);

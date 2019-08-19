import { prop, Typegoose } from 'typegoose';
import { CurrentBooking } from "./currentBooking.model";
import { TeacherPreference } from "../models/teacherPreference.model";
import { Workshop } from './workshop.model';
import { Location } from './location.model';
import { User } from './user.model';

export class Data extends Typegoose {

  @prop({ required: true })
  public currentBookings!: CurrentBooking[];

  @prop({ required: true })
  public teacherPreferences!: TeacherPreference[];

  @prop({ required: true })
  public workshops!: Workshop;

  @prop({ required: true })
  public locations!: Location[];

  @prop({ required: true })
  public users!: User[];

}

export const DataModel = new CurrentBooking().getModelForClass(Data);

import { arrayProp, Typegoose } from 'typegoose';
import { Booking } from "./booking.model";
import { TeacherPreference } from "../models/teacherPreference.model";
import { Workshop } from './workshop.model';
import { Location } from './location.model';
import { User } from './user.model';

export class Data extends Typegoose {

  @arrayProp({ required: true, items: Booking })
  public bookings!: Booking[];

  @arrayProp({ required: true, items: TeacherPreference })
  public teacherPreferences!: TeacherPreference[];

  @arrayProp({ required: true, items: Workshop })
  public workshops!: Workshop[];

  @arrayProp({ required: true, items: Location })
  public locations!: Location[];

  @arrayProp({ required: true, items: User })
  public users!: User[];

}

export const DataModel = new Booking().getModelForClass(Data);

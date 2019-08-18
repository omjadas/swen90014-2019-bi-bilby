import { prop, Typegoose } from 'typegoose';
import { Workshop } from './workshop';
import { Locations } from './locations';
import { User } from './user';
import { Facilitator } from './facilitator.model';

export class CurrentBookings extends Typegoose {

  @prop({ required: true })
  public confirmed!: boolean;

  //constraints GIVEN
  @prop({ required: true })
  public facilitator!: Facilitator;

  @prop({ required: true })
  public due!: number;

  @prop({ required: true })
  public location!: string;

  @prop({ required: true })
  public date!: Date;

  @prop({ required: true })
  public timeBeginHour!: number;

  @prop({ required: true })
  public timeBeginMinute!: number;

  @prop({ required: true })
  public timeEnd!: Date;

  //constraints GIVEN
  @prop({ required: true })
  public area!: Locations;

  //constraints GIVEN
  @prop({ required: true })
  public workshop!: Workshop;

  @prop({ required: true })
  public level!: number;

  @prop({ required: true })
  public school!: string;

  //constraints GIVEN
  @prop({ required: true })
  public contactName!: User;

  @prop({ required: true })
  public return!: boolean;

  @prop({ required: true })
  public numberOfStudents!: number;

  @prop({ required: true })
  public phoneNumber!: string;

  @prop({ required: true })
  public disabilityAccess!: boolean;

  @prop({ validate: /\S+@\S+\.\S+/ })
  public contactEmail?: string;
}

export const CurrentBookingsModel = new CurrentBookings().getModelForClass(CurrentBookings);

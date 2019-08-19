import { prop, Typegoose, Ref } from 'typegoose';
import { Workshop } from './workshop.model';
import { Locations } from './locations.model';
import { User } from './user.model';
import { Facilitator } from './facilitator.model';

export class CurrentBooking extends Typegoose {

  @prop({ required: true })
  public confirmed!: boolean;

  //constraints GIVEN
  @prop({ required: true, ref: Facilitator })
  public facilitator!: Ref<Facilitator>;

  @prop({ required: true })
  public due!: number;

  @prop({ required: true })
  public location!: string;

  @prop({ required: true })
  public timeBegin!: Date;

  @prop({ required: true})
  public timeEnd!: Date;

  //constraints GIVEN
  @prop({ required: true, ref: Locations })
  public area!: Ref<Locations>;

  //constraints GIVEN
  @prop({ required: true, ref: Workshop })
  public workshop!: Ref<Workshop>;

  @prop({ required: true })
  public level!: string;

  @prop({ required: true })
  public school!: string;

  //constraints GIVEN
  @prop({ required: true, ref: User })
  public contact!: Ref<User>;

  @prop({ required: true })
  public return!: boolean;

  @prop({ required: true })
  public numberOfStudents!: number;

  @prop({ required: true })
  public phoneNumber!: string;

  @prop({ required: true })
  public disabilityAccess!: boolean;

}

export const CurrentBookingModel = new CurrentBooking().getModelForClass(CurrentBooking);

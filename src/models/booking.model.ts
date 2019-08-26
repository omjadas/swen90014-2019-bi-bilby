import { prop, Typegoose, Ref } from 'typegoose';
import { Workshop } from './workshop.model';
import { Location } from './location.model';
import { User } from './user.model';
import { Facilitator } from './facilitator.model';
import { GuestSpeaker } from './guestSpeaker.model';
import { City } from './city.model';

export class Booking extends Typegoose {

  @prop({ required: true })
  public confirmed!: boolean;

  @prop({ required: true, ref: Facilitator })
  public facilitator!: Ref<Facilitator>;

  @prop({ required: false, ref: GuestSpeaker })
  public guestSpeaker?: Ref<GuestSpeaker>;

  @prop({ required: true })
  public timeBegin!: Date;

  @prop({ required: true})
  public timeEnd!: Date;

  @prop({ required: true, ref: City })
  public city!: Ref<City>;

  @prop({ required: true, ref: Location })
  public location!: Ref<Location>;

  @prop({ required: true, ref: Workshop })
  public workshop!: Ref<Workshop>;

  @prop({ required: true })
  public level!: string;

  @prop({ required: true, ref: User })
  public teacher!: Ref<User>;

  @prop({ required: true })
  public firstTime!: boolean;

  @prop({ required: true })
  public numberOfStudents!: number;

}

export const BookingModel = new Booking().getModelForClass(Booking);

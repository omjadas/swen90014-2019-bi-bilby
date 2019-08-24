import { arrayProp, prop, Typegoose, Ref } from 'typegoose';
import { City } from './city.model';
import { Availability } from "./facilitator.model";

export class GuestSpeaker extends Typegoose {

  @prop({ required: true, ref: City })
  public city!: Ref<City>;

  @prop({ required: true })
  public trained!: boolean;

  @prop({ required: true })
  public reliable!: boolean;

  @arrayProp({ required: true, items: Object })
  public availabilities!: Availability[];

}

export const GuestSpeakerModel = new GuestSpeaker().getModelForClass(GuestSpeaker);

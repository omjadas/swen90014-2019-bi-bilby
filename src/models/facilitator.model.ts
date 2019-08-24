import { arrayProp, prop, Typegoose, Ref } from 'typegoose';
import { City } from './city.model';

export enum dayOfWeek {
  MON = "monday",
  TUE = "tuesdsay",
  WED = "wednesday",
  THU = "thursday",
  FRI = "friday",
  SAT = "saturday",
  SUN = "sunday"
}

export interface Availability {
  morning: boolean,
  afternoon: boolean,
  dayOfWeek: dayOfWeek,
}

export class Facilitator extends Typegoose {

  @prop({ required: true, ref: City })
  public city!: Ref<City>;

  @prop({ required: true })
  public trained!: boolean;

  @arrayProp({ required: true, items: Object })
  public availabilities!: Availability[];

}

export const FacilitatorModel = new Facilitator().getModelForClass(Facilitator);

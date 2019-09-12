import { arrayProp, prop, Typegoose, Ref } from 'typegoose';
import { City } from './city.model';

export enum dayOfWeek {
  MON = "monday",
  TUE = "tuesday",
  WED = "wednesday",
  THU = "thursday",
  FRI = "friday",
  SAT = "saturday",
  SUN = "sunday"
}

export interface Availability {
  availableFrom: Date,
  availableUntil: Date,
  dayOfWeek: dayOfWeek,
}

export interface SpecificUnavailability {
  date: Date,
  notes: string,
}

export class Facilitator extends Typegoose {

  @prop({ required: true, ref: City })
  public city!: Ref<City>;

  @prop({ required: true })
  public trained!: boolean;

  @prop({ required: true })
  public reliable!: boolean;

  @arrayProp({ required: true, items: Object })
  public availabilities!: Availability[];

  @arrayProp({ required: true, items: Object })
  public SpecificUnavailabilities!: SpecificUnavailability[];

}

export const FacilitatorModel = new Facilitator().getModelForClass(Facilitator);

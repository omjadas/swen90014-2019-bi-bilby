import { arrayProp, prop, Typegoose, Ref } from 'typegoose';
import { City } from './city.model';
import { Availability, SpecificUnavailability } from './availability';

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
  public specificUnavailabilities!: SpecificUnavailability[];

}

export const FacilitatorModel = new Facilitator().getModelForClass(Facilitator);

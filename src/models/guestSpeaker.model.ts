import { arrayProp, prop, Typegoose, Ref } from "@hasezoey/typegoose";
import { City } from "./city.model";
import { Availability, Unavailability } from "./availability";

export class GuestSpeaker extends Typegoose {

  @prop({ required: true, ref: City })
  public city!: Ref<City>;

  @prop({ required: true })
  public trained!: string[];

  @prop({ required: true })
  public reliable!: boolean;

  @arrayProp({ required: true, items: Object })
  public availabilities!: Availability[];

  @arrayProp({ required: true, items: Object })
  public specificUnavailabilities!: Unavailability[];

  @arrayProp({ required: true, items: Object })
  public assignedTimes!: Availability[];

}

export const GuestSpeakerModel = new GuestSpeaker().getModelForClass(GuestSpeaker);

import { prop, Typegoose, Ref } from 'typegoose';
import { Location } from './location.model';

export class GuestSpeaker extends Typegoose {
  //constraints
  @prop({ required: true, ref: Location })
  public area!: Ref<Location>;

  @prop({ required: true })
  public trained!: boolean;

  @prop({ required: true })
  public reliable!: boolean;

  @prop({ required: true })
  public availability!: Date[];

}

export const GuestSpeakerModel = new GuestSpeaker().getModelForClass(GuestSpeaker);

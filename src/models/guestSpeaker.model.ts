import { prop, Typegoose } from 'typegoose';
import { Locations } from './locations';
import { User } from './user';

export class GuestSpeaker extends Typegoose {
  //constraints
  @prop({ required: true })
  public area!: Locations;

  @prop({ required: true })
  public contactName!: User;

  @prop({ required: true })
  public trained!: boolean;

  @prop({ required: true})
  public reliable!: boolean;

  // @prop({ required: true })
  // public phoneNumber!: string;

  // @prop()
  // public availability!: Date;

  // @prop({ validate: /\S+@\S+\.\S+/ })
  // public contactEmail?: string;
}

export const GuestSpeakerModel = new GuestSpeaker().getModelForClass(GuestSpeaker);

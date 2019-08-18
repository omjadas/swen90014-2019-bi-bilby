import { prop, Typegoose } from 'typegoose';
import { Locations } from './locations';
import { User } from './user';

export class Facilitator extends Typegoose {
  //constraints
  @prop({ required: true })
  public area!: Locations;

  @prop({ required: true })
  public contactName!: User;

  // @prop({ required: true })
  // public phoneNumber!: string;

  // @prop()
  // public availability!: Date;

  // @prop({ validate: /\S+@\S+\.\S+/ })
  // public contactEmail?: string;
}

export const FacilitatorModel = new Facilitator().getModelForClass(Facilitator);

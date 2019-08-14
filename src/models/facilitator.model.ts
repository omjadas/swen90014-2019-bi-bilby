import { prop, Typegoose } from 'typegoose';

export class Facilitator extends Typegoose {
  @prop({ required: true })
  public type!: string;

  @prop({ required: true })
  public area!: string;

  @prop({ required: true })
  public contactName!: string;

  @prop({ required: true })
  public phoneNumber!: string;

  @prop({ validate: /\S+@\S+\.\S+/ })
  public contactEmail?: string;
}

export const FacilitatorModel = new Facilitator().getModelForClass(Facilitator);

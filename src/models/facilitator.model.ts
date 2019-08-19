import { prop, Typegoose, Ref } from 'typegoose';
import { Location } from './location.model';

export class Facilitator extends Typegoose {
  //constraints
  @prop({ required: true, ref: Location })
  public area!: Ref<Location>;

  @prop({ required: true })
  public trained!: boolean;

  // @prop()
  // public availability!: Date;

}

export const FacilitatorModel = new Facilitator().getModelForClass(Facilitator);

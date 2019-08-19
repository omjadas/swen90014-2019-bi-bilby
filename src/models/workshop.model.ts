import { prop, Typegoose } from 'typegoose';

export class Workshop extends Typegoose {

  @prop({ required: true })
  public workshopName!: string;

  @prop({ required: true })
  public workshopType!: string;

}
export const WorkshopModel = new Workshop().getModelForClass(Workshop);

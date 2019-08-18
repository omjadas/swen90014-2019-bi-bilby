import { prop, Typegoose } from 'typegoose';

export class Locations extends Typegoose {

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public address!: string;

  @prop({ required: true })
  public capacity!: number;

  @prop({ required: true })
  public disabilityAccess!: boolean;

  @prop({ required: true })
  public facilities!: string;

}
export const LocationsModel = new Locations().getModelForClass(Locations);

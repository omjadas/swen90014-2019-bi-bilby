import { prop, Typegoose } from 'typegoose';
import { Data } from './data.models';

export class User extends Typegoose {

  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public lastName!: string;

  @prop({ required: true })
  public address!: string;

  @prop({ required: true })
  public userType!: string;

  @prop({ validate: /\S+@\S+\.\S+/ })
  public contactEmail?: string;

  @prop({ required: true })
  public phoneNumber!: number;

  @prop({ required: true })
  public availability!: Date;

}
export const UserModel = new User().getModelForClass(User);

import { prop, Typegoose, Ref } from 'typegoose';
import { Facilitator } from './facilitator.model';
import { GuestSpeaker } from './guestSpeaker.model';

enum Type {
  FACILITATOR = "facilitator",
  GUEST_SPEAKER = "guest_speaker"
}

export class User extends Typegoose {

  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public lastName!: string;

  @prop({ required: true })
  public address!: string;

  @prop({ required: true, enum: Type })
  public userType!: Type;

  @prop({ validate: /\S+@\S+\.\S+/ })
  public email?: string;

  @prop({ required: true })
  public phoneNumber!: number;

  @prop({ required: true })
  public availability!: Date[];

  @prop({ ref: Facilitator })
  public _facilitator?: Ref<Facilitator>;

  @prop({ ref: GuestSpeaker })
  public _guestSpeaker?: Ref<GuestSpeaker>;

}
export const UserModel = new User().getModelForClass(User);

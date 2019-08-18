import { prop, Typegoose } from 'typegoose';
import { Workshop } from './workshop';
import { Locations } from './locations';
import { User } from './user';

export class TeacherPreference extends Typegoose {
  @prop({ required: true })
  public date!: Date;

  @prop({ required: true })
  public timeBegin!: Date;

  @prop({ required: true })
  public timeEnd!: Date;

  //constraints GIVEN
  @prop({ required: true })
  public area!: Locations;

  //constraints GIVEN
  @prop({ required: true })
  public workshop!: Workshop;

  @prop({ required: true })
  public level!: number;

  @prop({ required: true })
  public school!: string;

  //constraints GIVEN
  @prop({ required: true })
  public contactName!: User;

  @prop({ required: true })
  public return!: boolean;

  @prop({ required: true })
  public numberOfStudents!: number;

  // @prop({ required: true })
  // public phoneNumber!: string;

  @prop({ required: true })
  public disabilityAccess!: boolean;

  // @prop({ validate: /\S+@\S+\.\S+/ })
  // public contactEmail?: string;
}

export const TeacherPreferenceModel = new TeacherPreference().getModelForClass(TeacherPreference);

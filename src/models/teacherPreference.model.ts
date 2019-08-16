import { prop, Typegoose } from 'typegoose';

export class TeacherPreference extends Typegoose {
  @prop({ required: true })
  public day!: string;

  @prop({ required: true })
  public date!: string;

  @prop({ required: true })
  public timeBegin!: Date;

  @prop({ required: true })
  public timeEnd!: Date;

  @prop({ required: true })
  public area!: string;

  @prop({ required: true })
  public workshop!: string;

  @prop({ required: true })
  public level!: number;

  @prop({ required: true })
  public school!: string;

  @prop({ required: true })
  public contactName!: string;

  @prop({ required: true })
  public return!: boolean;

  @prop({ required: true })
  public numberOfStudents!: number;

  @prop({ required: true })
  public phoneNumber!: string;

  @prop({ required: true })
  public disabilityAccess!: boolean;

  @prop({ validate: /\S+@\S+\.\S+/ })
  public contactEmail?: string;
}

export const TeacherPreferenceModel = new TeacherPreference().getModelForClass(TeacherPreference);

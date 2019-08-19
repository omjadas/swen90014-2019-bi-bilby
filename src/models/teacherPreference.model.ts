import { prop, Typegoose, Ref } from 'typegoose';
import { Workshop } from './workshop.model';
import { Location } from './location.model';
import { User } from './user.model';

export class TeacherPreference extends Typegoose {

  @prop({ required: true })
  public timeBegin!: Date;

  @prop({ required: true })
  public timeEnd!: Date;

  //constraints GIVEN
  @prop({ required: true, ref: Location })
  public area!: Ref<Location>;

  //constraints GIVEN
  @prop({ required: true, ref: Workshop })
  public workshop!: Ref<Workshop>;

  @prop({ required: true })
  public level!: string;

  @prop({ required: true })
  public school!: string;

  //constraints GIVEN
  @prop({ required: true, ref: User })
  public contact!: Ref<User>;

  @prop({ required: true })
  public return!: boolean;

  @prop({ required: true })
  public numberOfStudents!: number;

  @prop({ required: true })
  public disabilityAccess!: boolean;

}

export const TeacherPreferenceModel = new TeacherPreference().getModelForClass(TeacherPreference);

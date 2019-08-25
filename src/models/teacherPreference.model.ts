import { prop, arrayProp, Typegoose, Ref } from 'typegoose';
import { Workshop } from './workshop.model';
import { City } from './city.model';
import { User } from './user.model';

export interface SessionTime {
  timeBegin: Date,
  timeEnd: Date,
}

export class TeacherPreference extends Typegoose {

  @arrayProp({ required: true })
  public sessionTimes!: SessionTime[];

  @prop({ required: true, ref: City })
  public city!: Ref<City>;

  @prop({ required: true, ref: Workshop })
  public workshop!: Ref<Workshop>;

  @prop({ required: true })
  public level!: string;

  @prop({ required: true })
  public school!: string;

  @prop({ required: true, ref: User })
  public contact!: Ref<User>;

  @prop({ required: true })
  public return!: boolean;

  @prop({ required: true })
  public numberOfStudents!: number;

  @prop({ required: true })
  public disabilityAccess!: boolean;

  @prop({ required: false })
  public specialNotes?: string;

}

export const TeacherPreferenceModel = new TeacherPreference().getModelForClass(TeacherPreference);

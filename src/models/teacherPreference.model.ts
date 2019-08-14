import mongoose from "mongoose";

// teacherPreference schema
const teacherPreferenceSchema = new mongoose.Schema({
  day:{type:String},
  date:{type:Date},
  timeBegin:{type:Date},
  timeEnd:{type:Date},
  area:{type:String},
  workshop:{type:String},
  level:{type:Number},
  school:{type:String},
  contactName: { type: String },
  return:{type: Boolean},
  numberOfStudents:{type:Number},
  phoneNumber: { type: String },
  disabilityAccess:{type: Boolean},
  contactEmail: { type: String }
});

module.exports = mongoose.model("TeacherPreference", teacherPreferenceSchema);

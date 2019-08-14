import mongoose from "mongoose";

// CurrentBookings schema
const currentBookingsSchema = new mongoose.Schema({
  confirmed:{type: Boolean},
  facilitator:{type:String},
  due:{type:Number},
  location:{type:String},
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

module.exports = mongoose.model("CurrentBookings", currentBookingsSchema);

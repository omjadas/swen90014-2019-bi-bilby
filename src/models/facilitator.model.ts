import mongoose from "mongoose";

// facilitator schema
const facilitatorSchema = new mongoose.Schema({
  type: { type: String },
  area: { type: String },
  contactName: { type: String },
  phoneNumber: { type: String },
  contactEmail: { type: String }
});

module.exports = mongoose.model("facilitator", facilitatorSchema);

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostHaulSchema = new Schema({
  id: { type: Number, index: true, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  message: { type: String },
  items: { type: Array, required: true },
  vehicleType: { type: String, required: true },
  shared: { type: Boolean, required: true },
  seat: { type: Boolean, required: true },
  created: { type: Date, default: new Date() },
});

export const PostHaul = mongoose.model("PostHaul", PostHaulSchema);

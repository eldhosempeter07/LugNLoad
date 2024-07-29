import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RequestHaulSchema = new Schema({
  id: { type: Number, index: true, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  driverName: { type: String, required: true },
  driverId: { type: String, required: true },
  vehicleCapacity: { type: Number, required: true },
  vehicleDimension: { type: String, required: true },
  vehicleType: { type: String, required: true },
  email: { type: String, required: true },
  shared: { type: Boolean, required: true },
  seat: { type: Boolean, required: true },
  budget: { type: Number, required: true },
  vehiclePlateNumber: { type: String, required: true },
  created: { type: Date, default: new Date() },
});

export const RequestHaul = mongoose.model("RequestHaul", RequestHaulSchema);

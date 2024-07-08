import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postHaulerSchema = new Schema({
  id: {
    type: Number,
    index: true,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  driverId: {
    type: String,
    required: true,
  },
  vehicleCapacity: {
    type: Number,
    required: true,
  },
  vehicleDimension: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
  vehiclePlateNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const PostHauler = mongoose.model("PostHauler", postHaulerSchema);

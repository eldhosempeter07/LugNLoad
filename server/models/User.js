import mongoose, { model } from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now },
  address: { type: String },
  type: { type: String, default: "User" },
});

const HaulerSchema = new Schema({
  name: String,
  image: String,
  phone: String,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: new Date() },
  email: { type: String, required: true },
  password: { type: String, required: true },
  license: { type: String, required: true },
  address: { type: String },
  type: { type: String, default: "Hauler" },
  vehicleDimension: { type: String, required: true },
  vehicleCapacity: { type: Number, required: true },
  vehicleType: { type: String, required: true },
  vehiclePlateNumber: { type: String, required: true },
});

const User = model("User", UserSchema);
const Hauler = model("Hauler", HaulerSchema);

export { Hauler, User };

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const requestHaulerSchema = new Schema({
  id: {
    type: Number,
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
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  message: {
    type: String,
  },
});

export const RequestHauler = mongoose.model(
  "RequestHauler",
  requestHaulerSchema
);

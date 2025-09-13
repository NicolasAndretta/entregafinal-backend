import mongoose from "mongoose";

const mocksCollection = "Mocks";

const mocksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: { type: String },
  thumbnail: { type: String },
}, { timestamps: true });

const Mocks = mongoose.model(mocksCollection, mocksSchema);

export default Mocks;

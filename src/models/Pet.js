//src/models/Pet.js
import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["dog", "cat", "bird", "other"], required: true },
    age: { type: Number, required: true },
    adopted: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
  },
  { timestamps: true }
);

export default mongoose.model("Pet", petSchema);

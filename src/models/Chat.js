import mongoose from "mongoose";

// Esquema del chat: guarda usuario, mensaje y timestamps
const chatSchema = new mongoose.Schema(
  {
    user: { type: String, required: true }, // puede ser nombre o email
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);

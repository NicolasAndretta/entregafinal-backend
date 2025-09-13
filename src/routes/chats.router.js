//src/routes/chats.router.js
import { Router } from "express";
import {
  getChats,
  createChat,
  clearChats,
} from "../controllers/chat.controller.js";

const router = Router();

router.get("/", getChats);     // Obtener mensajes
router.post("/", createChat);  // Crear mensaje
router.delete("/", clearChats); // Eliminar todos los mensajes

export default router;
//src/routes/chats.router.js
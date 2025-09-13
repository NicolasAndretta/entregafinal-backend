//src/controllers/chat.controller.js
import * as chatService from "../services/chat.service.js";

// Obtener todos los mensajes
export const getChats = async (req, res) => {
  try {
    const chats = await chatService.getAll();
    res.json({ status: "success", payload: chats });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Crear un mensaje
export const createChat = async (req, res) => {
  try {
    const { user, message } = req.body;

    if (!user || !message) {
      return res
        .status(400)
        .json({ status: "error", message: "Faltan campos obligatorios" });
    }

    const newMessage = await chatService.create({ user, message });
    res.status(201).json({ status: "success", payload: newMessage });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Eliminar todos los mensajes
export const clearChats = async (req, res) => {
  try {
    await chatService.removeAll();
    res.json({ status: "success", message: "Todos los chats eliminados" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

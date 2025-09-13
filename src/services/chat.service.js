import Chat from "../models/Chat.js";

// Obtener todos los mensajes ordenados por fecha (últimos primero)
export const getAll = async () => {
  return await Chat.find().sort({ createdAt: -1 }).lean();
};

// Crear un nuevo mensaje
export const create = async (data) => {
  return await Chat.create(data);
};

// Eliminar todos los mensajes
export const removeAll = async () => {
  return await Chat.deleteMany({});
};

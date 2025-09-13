// src/services/user.service.js
import User from "../models/User.js";

// Obtener todos los usuarios
export const getAll = async () => {
  return await User.find().lean();
};

// Obtener usuario por ID
export const getById = async (id) => {
  return await User.findById(id).lean();
};

// Crear usuario
export const create = async (userData) => {
  return await User.create(userData);
};

// Actualizar usuario
export const update = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

// Eliminar usuario
export const remove = async (id) => {
  return await User.findByIdAndDelete(id);
};

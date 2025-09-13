// src/controllers/user.controller.js
import * as userService from "../services/user.service.js";
import bcrypt from "bcrypt";

// GET todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAll();
    res.json({ status: "success", payload: users });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// GET usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await userService.getById(req.params.id);
    if (!user) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
    res.json({ status: "success", payload: user });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// POST crear usuario
export const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ status: "error", message: "Faltan campos obligatorios" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userService.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({ status: "success", payload: newUser });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ status: "error", message: "El email ya existe" });
    }
    res.status(500).json({ status: "error", message: err.message });
  }
};

// PUT actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    if (password) rest.password = await bcrypt.hash(password, 10);

    const updatedUser = await userService.update(req.params.id, rest);
    if (!updatedUser) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });

    res.json({ status: "success", payload: updatedUser });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// DELETE eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const deleted = await userService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });

    res.json({ status: "success", message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

//src/controllers/adoption.controller.js
import * as adoptionService from "../services/adoption.service.js";

// Obtener todas las adopciones
export const getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await adoptionService.getAll();
    res.json({ status: "success", payload: adoptions });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Obtener una adopción por ID
export const getAdoptionById = async (req, res) => {
  try {
    const adoption = await adoptionService.getById(req.params.id);
    if (!adoption) return res.status(404).json({ status: "error", message: "Adopción no encontrada" });
    res.json({ status: "success", payload: adoption });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Crear adopción
export const createAdoption = async (req, res) => {
  try {
    const { user, pet } = req.body;
    if (!user || !pet) {
      return res.status(400).json({ status: "error", message: "Faltan campos obligatorios" });
    }

    const newAdoption = await adoptionService.create({ user, pet });
    res.status(201).json({ status: "success", payload: newAdoption });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Eliminar adopción
export const deleteAdoption = async (req, res) => {
  try {
    const deleted = await adoptionService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ status: "error", message: "Adopción no encontrada" });
    res.json({ status: "success", message: "Adopción eliminada" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

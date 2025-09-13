//src/pet.controller.js
import * as petService from "../services/pet.service.js";

// Obtener todas las mascotas
export const getAllPets = async (req, res) => {
  try {
    const pets = await petService.getAll();
    res.json({ status: "success", payload: pets });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Obtener mascota por ID
export const getPetById = async (req, res) => {
  try {
    const pet = await petService.getById(req.params.id);
    if (!pet) return res.status(404).json({ status: "error", message: "Mascota no encontrada" });
    res.json({ status: "success", payload: pet });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Crear mascota
export const createPet = async (req, res) => {
  try {
    const { name, type, age } = req.body;
    if (!name || !type || !age) {
      return res.status(400).json({ status: "error", message: "Faltan campos obligatorios" });
    }

    const newPet = await petService.create({ name, type, age });
    res.status(201).json({ status: "success", payload: newPet });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Actualizar mascota
export const updatePet = async (req, res) => {
  try {
    const updatedPet = await petService.update(req.params.id, req.body);
    if (!updatedPet) return res.status(404).json({ status: "error", message: "Mascota no encontrada" });

    res.json({ status: "success", payload: updatedPet });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Eliminar mascota
export const deletePet = async (req, res) => {
  try {
    const deleted = await petService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ status: "error", message: "Mascota no encontrada" });
    res.json({ status: "success", message: "Mascota eliminada" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

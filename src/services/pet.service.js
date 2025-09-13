// src/services/pet.service.js
import Pet from "../models/Pet.js";

export const getAll = async () => {
  return await Pet.find().lean();
};

export const getById = async (id) => {
  return await Pet.findById(id).lean();
};

export const create = async (petData) => {
  return await Pet.create(petData);
};

export const update = async (id, updateData) => {
  return await Pet.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

export const remove = async (id) => {
  return await Pet.findByIdAndDelete(id);
};

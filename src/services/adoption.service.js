// src/services/adoption.service.js
import Adoption from "../models/Adoption.js";

export const getAll = async () => {
  return await Adoption.find().populate("user pet").lean();
};

export const getById = async (id) => {
  return await Adoption.findById(id).populate("user pet").lean();
};

export const create = async (data) => {
  return await Adoption.create(data);
};

export const remove = async (id) => {
  return await Adoption.findByIdAndDelete(id);
};

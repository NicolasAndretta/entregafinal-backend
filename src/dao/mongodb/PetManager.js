// src/dao/mongodb/PetManager.js
import Pet from "../../models/Pet.js";

export default class PetManager {
  async getAll() {
    return await Pet.find().lean();
  }

  async getById(id) {
    return await Pet.findById(id).lean();
  }

  async create(petData) {
    return await Pet.create(petData);
  }

  async update(id, updateData) {
    return await Pet.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  async delete(id) {
    return await Pet.findByIdAndDelete(id);
  }
}

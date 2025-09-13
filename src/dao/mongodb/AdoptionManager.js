// src/dao/mongodb/AdoptionManager.js
import Adoption from "../../models/Adoption.js";

export default class AdoptionManager {
  async getAll() {
    return await Adoption.find().populate("user pet").lean();
  }

  async getById(id) {
    return await Adoption.findById(id).populate("user pet").lean();
  }

  async create(adoptionData) {
    return await Adoption.create(adoptionData);
  }

  async delete(id) {
    return await Adoption.findByIdAndDelete(id);
  }
}

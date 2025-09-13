//src/dao/mongodb/UserManager.js
import User from "../../models/User.js";

export default class UserManager {
  async getAll() {
    return await User.find().lean();
  }

  async getById(id) {
    return await User.findById(id).lean();
  }

  async create(userData) {
    return await User.create(userData);
  }

  async update(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

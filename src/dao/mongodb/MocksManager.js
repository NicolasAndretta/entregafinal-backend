//src/dao/mongodb/MocksManager.js
import Mocks from "../../models/Mocks.js";

export default class MocksManagerMongo {
  async getAll() {
    try {
      return await Mocks.find().lean();
    } catch (error) {
      throw new Error("Error al obtener mocks desde MongoDB: " + error.message);
    }
  }

  async createMock(mock) {
    try {
      return await Mocks.create(mock);
    } catch (error) {
      throw new Error("Error al crear mock en MongoDB: " + error.message);
    }
  }

  async deleteAll() {
    try {
      return await Mocks.deleteMany({});
    } catch (error) {
      throw new Error("Error al eliminar mocks de MongoDB: " + error.message);
    }
  }
}

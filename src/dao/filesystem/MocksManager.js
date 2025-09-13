//src/dao/filesystem/MocksManager.js
import fs from "fs";
import path from "path";

const filePath = path.resolve("src/dao/filesystem/mocks.json");

export default class MocksManagerFS {
  async getAll() {
    try {
      if (!fs.existsSync(filePath)) return [];
      const data = await fs.promises.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error("Error al leer mocks desde FS: " + error.message);
    }
  }

  async createMock(mock) {
    try {
      const mocks = await this.getAll();
      mocks.push(mock);
      await fs.promises.writeFile(filePath, JSON.stringify(mocks, null, 2));
      return mock;
    } catch (error) {
      throw new Error("Error al guardar mock en FS: " + error.message);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(filePath, JSON.stringify([], null, 2));
      return true;
    } catch (error) {
      throw new Error("Error al eliminar mocks en FS: " + error.message);
    }
  }
}

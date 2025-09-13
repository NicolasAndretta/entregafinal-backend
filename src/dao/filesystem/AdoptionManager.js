// src/dao/filesystem/AdoptionManager.js
import fs from "fs";
import path from "path";

const adoptionsFile = path.resolve("src/dao/filesystem/db/adoptions.json");

export default class AdoptionManager {
  constructor() {
    if (!fs.existsSync(adoptionsFile)) {
      fs.writeFileSync(adoptionsFile, JSON.stringify([]));
    }
  }

  async getAll() {
    const data = await fs.promises.readFile(adoptionsFile, "utf-8");
    return JSON.parse(data);
  }

  async getById(id) {
    const adoptions = await this.getAll();
    return adoptions.find(a => a.id === id);
  }

  async create(adoptionData) {
    const adoptions = await this.getAll();
    const newAdoption = {
      id: String(Date.now()),
      ...adoptionData
    };
    adoptions.push(newAdoption);
    await fs.promises.writeFile(adoptionsFile, JSON.stringify(adoptions, null, 2));
    return newAdoption;
  }

  async delete(id) {
    const adoptions = await this.getAll();
    const newAdoptions = adoptions.filter(a => a.id !== id);
    if (adoptions.length === newAdoptions.length) return null;

    await fs.promises.writeFile(adoptionsFile, JSON.stringify(newAdoptions, null, 2));
    return true;
  }
}

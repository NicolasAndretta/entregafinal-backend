// src/dao/filesystem/PetManager.js
import fs from "fs";
import path from "path";

const petsFile = path.resolve("src/dao/filesystem/db/pets.json");

export default class PetManager {
  constructor() {
    if (!fs.existsSync(petsFile)) {
      fs.writeFileSync(petsFile, JSON.stringify([]));
    }
  }

  async getAll() {
    const data = await fs.promises.readFile(petsFile, "utf-8");
    return JSON.parse(data);
  }

  async getById(id) {
    const pets = await this.getAll();
    return pets.find(p => p.id === id);
  }

  async create(petData) {
    const pets = await this.getAll();
    const newPet = {
      id: String(Date.now()),
      ...petData
    };
    pets.push(newPet);
    await fs.promises.writeFile(petsFile, JSON.stringify(pets, null, 2));
    return newPet;
  }

  async update(id, updateData) {
    const pets = await this.getAll();
    const index = pets.findIndex(p => p.id === id);
    if (index === -1) return null;

    pets[index] = { ...pets[index], ...updateData };
    await fs.promises.writeFile(petsFile, JSON.stringify(pets, null, 2));
    return pets[index];
  }

  async delete(id) {
    const pets = await this.getAll();
    const newPets = pets.filter(p => p.id !== id);
    if (pets.length === newPets.length) return null;

    await fs.promises.writeFile(petsFile, JSON.stringify(newPets, null, 2));
    return true;
  }
}

// src/dao/filesystem/UserManager.js
import fs from "fs";
import path from "path";

const usersFile = path.resolve("src/dao/filesystem/db/users.json");

export default class UserManager {
  constructor() {
    if (!fs.existsSync(usersFile)) {
      fs.writeFileSync(usersFile, JSON.stringify([]));
    }
  }

  async getAll() {
    const data = await fs.promises.readFile(usersFile, "utf-8");
    return JSON.parse(data);
  }

  async getById(id) {
    const users = await this.getAll();
    return users.find(u => u.id === id);
  }

  async create(userData) {
    const users = await this.getAll();
    const newUser = {
      id: String(Date.now()),
      ...userData
    };
    users.push(newUser);
    await fs.promises.writeFile(usersFile, JSON.stringify(users, null, 2));
    return newUser;
  }

  async update(id, updateData) {
    const users = await this.getAll();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;

    users[index] = { ...users[index], ...updateData };
    await fs.promises.writeFile(usersFile, JSON.stringify(users, null, 2));
    return users[index];
  }

  async delete(id) {
    const users = await this.getAll();
    const newUsers = users.filter(u => u.id !== id);
    if (users.length === newUsers.length) return null;

    await fs.promises.writeFile(usersFile, JSON.stringify(newUsers, null, 2));
    return true;
  }
}

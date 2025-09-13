//src/dao/filesystem/TicketManager.js
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_PATH = path.resolve("./src/dao/filesystem/tickets.json");

export default class TicketManagerFS {
  constructor(filePath = DEFAULT_PATH) {
    this.path = filePath;
    // Asegurar archivo
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(path.dirname(this.path), { recursive: true });
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }

  async _readFile() {
    const raw = fs.readFileSync(this.path, "utf-8");
    return JSON.parse(raw || "[]");
  }

  async _writeFile(items) {
    fs.writeFileSync(this.path, JSON.stringify(items, null, 2));
  }

  async createTicket(purchaser, products = [], amount = 0) {
    const tickets = await this._readFile();
    const code = `T-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const ticket = {
      id: uuidv4(),
      code,
      purchaser,
      products,
      amount,
      status: "completed",
      purchase_datetime: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tickets.push(ticket);
    await this._writeFile(tickets);
    return ticket;
  }

  async getAll() {
    return await this._readFile();
  }

  async getById(idOrCode) {
    const tickets = await this._readFile();
    return tickets.find(t => t.id === idOrCode || t.code === idOrCode) || null;
  }

  async deleteById(id) {
    const tickets = await this._readFile();
    const filtered = tickets.filter(t => t.id !== id && t.code !== id);
    await this._writeFile(filtered);
    return tickets.length !== filtered.length;
  }
}

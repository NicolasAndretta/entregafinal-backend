//src/dao/filesystem/ProductManager.js
import fs from "fs";
import path from "path";

export default class ProductManager {
  constructor() {
    this.filePath = path.resolve("src/dao/filesystem/db_products.json");
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
  }

  async getAll() {
    const data = await fs.promises.readFile(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  async getById(id) {
    const products = await this.getAll();
    return products.find((p) => p.id === id);
  }

  async create(product) {
    const products = await this.getAll();
    const newProduct = { id: Date.now().toString(), ...product };
    products.push(newProduct);
    await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async update(id, data) {
    const products = await this.getAll();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...data };
    await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
    return products[index];
  }

  async delete(id) {
    const products = await this.getAll();
    const newProducts = products.filter((p) => p.id !== id);
    if (newProducts.length === products.length) return null;
    await fs.promises.writeFile(this.filePath, JSON.stringify(newProducts, null, 2));
    return true;
  }
}

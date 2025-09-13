//src/dao/filesystem/CartManager.js
import fs from "fs";
import path from "path";

export default class CartManager {
  constructor() {
    this.filePath = path.resolve("src/dao/filesystem/db_carts.json");
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
  }

  async getAll() {
    const data = await fs.promises.readFile(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  async getById(id) {
    const carts = await this.getAll();
    return carts.find((c) => c.id === id);
  }

  async create() {
    const carts = await this.getAll();
    const newCart = { id: Date.now().toString(), products: [] };
    carts.push(newCart);
    await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async addProduct(cartId, productId, quantity = 1) {
    const carts = await this.getAll();
    const cart = carts.find((c) => c.id === cartId);
    if (!cart) return null;

    const existingProduct = cart.products.find((p) => p.product === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, 2));
    return cart;
  }

  async delete(cartId) {
    const carts = await this.getAll();
    const newCarts = carts.filter((c) => c.id !== cartId);
    if (newCarts.length === carts.length) return null;
    await fs.promises.writeFile(this.filePath, JSON.stringify(newCarts, null, 2));
    return true;
  }
}

//src/dao/mongodb/CartManager.js
import Cart from "../../models/Cart.js";

export default class CartManager {
  async getAll() {
    return Cart.find().populate("products.product").lean();
  }

  async getById(id) {
    return Cart.findById(id).populate("products.product").lean();
  }

  async create() {
    return Cart.create({ products: [] });
  }

  async addProduct(cartId, productId, quantity = 1) {
    const cart = await Cart.findById(cartId);
    if (!cart) return null;

    const existing = cart.products.find((p) => p.product.toString() === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    return cart.populate("products.product");
  }

  async delete(cartId) {
    return Cart.findByIdAndDelete(cartId).lean();
  }
}

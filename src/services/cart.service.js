//src/services/cart.service.js
import CartManagerMongo from "../dao/mongodb/CartManager.js";
import CartManagerFS from "../dao/filesystem/CartManager.js";

const persistence = process.env.PERSISTENCE || "MONGO";

const cartDAO = persistence === "FS"
  ? new CartManagerFS()
  : new CartManagerMongo();

export const getCarts = () => cartDAO.getAll();
export const getCartById = (id) => cartDAO.getById(id);
export const createCart = () => cartDAO.create();
export const addProductToCart = (cartId, productId, quantity) =>
  cartDAO.addProduct(cartId, productId, quantity);
export const deleteCart = (id) => cartDAO.delete(id);

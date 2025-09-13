//src/services/product.service.js
import ProductManagerMongo from "../dao/mongodb/ProductManager.js";
import ProductManagerFS from "../dao/filesystem/ProductManager.js";

const persistence = process.env.PERSISTENCE || "MONGO";

const productDAO = persistence === "FS"
  ? new ProductManagerFS()
  : new ProductManagerMongo();

export const getProducts = () => productDAO.getAll();
export const getProductById = (id) => productDAO.getById(id);
export const createProduct = (data) => productDAO.create(data);
export const updateProduct = (id, data) => productDAO.update(id, data);
export const deleteProduct = (id) => productDAO.delete(id);

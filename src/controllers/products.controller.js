//src/controllers/products.controller.js
import * as productService from "../services/product.service.js";

export const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.json({ status: "success", payload: products });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    res.json({ status: "success", payload: product });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, price, category, stock } = req.body;
    if (!title || !price || !category) {
      return res.status(400).json({ status: "error", message: "Campos obligatorios faltantes" });
    }
    const product = await productService.createProduct(req.body);
    res.status(201).json({ status: "success", payload: product });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    res.json({ status: "success", payload: product });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await productService.deleteProduct(req.params.id);
    if (!deleted) return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    res.json({ status: "success", message: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

//src/controllers/carts.controller.js
import * as cartService from "../services/cart.service.js";

export const getCarts = async (req, res) => {
  try {
    const carts = await cartService.getCarts();
    res.json({ status: "success", payload: carts });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cart = await cartService.getCartById(req.params.id);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    res.json({ status: "success", payload: cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const createCart = async (req, res) => {
  try {
    const cart = await cartService.createCart();
    res.status(201).json({ status: "success", payload: cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await cartService.addProductToCart(req.params.cid, req.params.pid, quantity || 1);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito o producto no encontrado" });
    res.json({ status: "success", payload: cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const deleted = await cartService.deleteCart(req.params.id);
    if (!deleted) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    res.json({ status: "success", message: "Carrito eliminado" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

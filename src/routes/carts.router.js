//src/routes/carts.router.js
import { Router } from "express";
import {
  getCarts,
  getCartById,
  createCart,
  addProductToCart,
  deleteCart
} from "../controllers/carts.controller.js";

const router = Router();

router.get("/", getCarts);
router.get("/:id", getCartById);
router.post("/", createCart);
router.post("/:cid/products/:pid", addProductToCart);
router.delete("/:id", deleteCart);

export default router;

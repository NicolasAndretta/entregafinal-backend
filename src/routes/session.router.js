//src/routes/session.router.js
import { Router } from "express";
import { startSession, getSession, endSession } from "../controllers/session.controller.js";

const router = Router();

router.post("/", startSession); // Inicia sesión
router.get("/:token", getSession); // Obtiene sesión por token
router.delete("/:token", endSession); // Elimina sesión

export default router;

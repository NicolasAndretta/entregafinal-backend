//src/routes/adoption.router.js
import { Router } from "express";
import {
  getAllAdoptions,
  getAdoptionById,
  createAdoption,
  deleteAdoption
} from "../controllers/adoption.controller.js";

const router = Router();

router.get("/", getAllAdoptions);
router.get("/:id", getAdoptionById);
router.post("/", createAdoption);
router.delete("/:id", deleteAdoption);

export default router;

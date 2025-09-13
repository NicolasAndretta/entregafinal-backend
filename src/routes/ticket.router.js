//src/routes/ticket.router.js
import { Router } from "express";
import {
  createTicketController,
  listTicketsController,
  getTicketController,
  deleteTicketController
} from "../controllers/ticket.controller.js";

const router = Router();

router.post("/", createTicketController);
router.get("/", listTicketsController);
router.get("/:id", getTicketController);
router.delete("/:id", deleteTicketController);

export default router;

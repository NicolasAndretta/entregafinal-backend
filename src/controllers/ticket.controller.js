//src/controllers/ticket.controller.js
import * as ticketService from "../services/ticket.service.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const createTicketController = async (req, res) => {
  try {
    const { purchaser, products, amount } = req.body;

    // validations (basic)
    if (!purchaser || !products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ status: "error", message: "Datos inválidos: purchaser y products son requeridos" });
    }

    // Optional: verify purchaser exists
    const user = await User.findById(purchaser);
    if (!user) return res.status(404).json({ status: "error", message: "Usuario (purchaser) no encontrado" });

    // Optional: verify products exist (simple)
    for (const item of products) {
      const prod = await Product.findById(item.product);
      if (!prod) return res.status(404).json({ status: "error", message: `Producto no encontrado: ${item.product}` });
    }

    const ticket = await ticketService.createTicket(purchaser, products, amount ?? 0);
    res.status(201).json({ status: "success", payload: ticket });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const listTicketsController = async (req, res) => {
  try {
    const tickets = await ticketService.getAllTickets();
    res.json({ status: "success", payload: tickets });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const getTicketController = async (req, res) => {
  try {
    const ticket = await ticketService.getTicketById(req.params.id);
    if (!ticket) return res.status(404).json({ status: "error", message: "Ticket no encontrado" });
    res.json({ status: "success", payload: ticket });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const deleteTicketController = async (req, res) => {
  try {
    const ok = await ticketService.deleteTicketById(req.params.id);
    if (!ok) return res.status(404).json({ status: "error", message: "Ticket no encontrado" });
    res.json({ status: "success", message: "Ticket eliminado" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

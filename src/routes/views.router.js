//src/routes/views.router.js+
import { Router } from "express";
import Product from "../dao/mongodb/models/Product.js";
import Cart from "../dao/mongodb/models/Cart.js";
import Ticket from "../dao/mongodb/models/Ticket.js";
import User from "../models/User.js";
import Session from "../models/Session.js";
import { generateMockProducts } from "../services/mocks.service.js";

const router = Router();

// Vista productos
router.get("/products", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await Product.paginate({}, { page, limit, lean: true });
    res.render("products", {
      title: "Productos",
      products: products.docs,
      pagination: {
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        currentPage: products.page,
      },
    });
  } catch (err) {
    res.status(500).send("Error al cargar productos");
  }
});

// Vista carrito
router.get("/carts/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate("products.product").lean();
    if (!cart) return res.status(404).send("Carrito no encontrado");
    res.render("carts", { title: "Carrito", cart });
  } catch (err) {
    res.status(500).send("Error al cargar carrito");
  }
});

// Vista tickets
router.get("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find().lean();
    res.render("tickets", { title: "Tickets", tickets });
  } catch (err) {
    res.status(500).send("Error al cargar tickets");
  }
});

// Vista usuarios
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().lean();
    res.render("users", { title: "Usuarios", users });
  } catch (err) {
    res.status(500).send("Error al cargar usuarios");
  }
});

// Vista sesiones
router.get("/sessions", async (req, res) => {
  try {
    const sessions = await Session.find().populate("user").lean();
    res.render("sessions", { title: "Sesiones", sessions });
  } catch (err) {
    res.status(500).send("Error al cargar sesiones");
  }
});

// Vista mocks
router.get("/mocks", async (req, res) => {
  try {
    const { qty } = req.query;
    const quantity = qty ? parseInt(qty) : 10;
    const mocks = generateMockProducts(quantity);
    res.render("mocks", { title: "Mocks", mocks });
  } catch (err) {
    res.status(500).send("Error al cargar mocks");
  }
});

export default router;

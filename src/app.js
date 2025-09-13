//src/app.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { connectDB } from "./config/db.js";

// Routers API
import usersRouter from "./routes/users.router.js";
import adoptionRouter from "./routes/adoption.router.js";
import mocksRouter from "./routes/mocks.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import petsRouter from "./routes/pets.router.js";
import ticketsRouter from "./routes/ticket.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import chatsRouter from "./routes/chats.router.js";
import cardsRouter from "./routes/cards.router.js";

// Router de vistas
import viewsRouter from "./routes/views.router.js";

const app = express();

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // ✅ permite PUT y DELETE desde formularios

// Swagger config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Entrega Final Backend",
      version: "1.0.0",
      description: "API del proyecto final con Swagger, Tests y Docker",
    },
  },
  apis: [`${__dirname}/docs/*.yaml`],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rutas API
app.use("/api/users", usersRouter);
app.use("/api/adoptions", adoptionRouter);
app.use("/api/mocks", mocksRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/pets", petsRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/chats", chatsRouter);
app.use("/api/cards", cardsRouter);

// Rutas vistas (Handlebars)
app.use("/", viewsRouter);

// Conectar DB y levantar server (excepto en test)
if (process.env.NODE_ENV !== "test") {
  connectDB();

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  });
}

export default app;

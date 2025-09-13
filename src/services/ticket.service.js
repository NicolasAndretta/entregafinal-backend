//src/services/ticket.service.js
import TicketManagerMongo from "../dao/mongodb/TicketManager.js";
import TicketManagerFS from "../dao/filesystem/TicketManager.js";

const PERSISTENCE = process.env.PERSISTENCE || "MONGO";

let manager;
if (PERSISTENCE === "FS") {
  manager = new TicketManagerFS();
} else {
  manager = new TicketManagerMongo();
}

export const createTicket = (purchaser, products, amount) =>
  manager.createTicket(purchaser, products, amount);

export const getAllTickets = () => manager.getAll();

export const getTicketById = (id) => manager.getById(id);

export const deleteTicketById = (id) => manager.deleteById(id);

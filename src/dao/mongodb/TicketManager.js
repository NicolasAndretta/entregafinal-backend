//src/dao/mongodb/TicketManager.js
import Ticket from "../../models/Ticket.js";

export default class TicketManagerMongo {
  async createTicket(purchaser, products = [], amount = 0) {
    // generar code único
    const code = `T-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const ticket = new Ticket({
      code,
      purchaser,
      products,
      amount,
      status: "completed",
      purchase_datetime: new Date(),
    });
    return await ticket.save();
  }

  async getAll() {
    return await Ticket.find().populate("purchaser").populate("products.product").lean();
  }

  async getById(id) {
    return await Ticket.findOne({ $or: [{ _id: id }, { code: id }] })
      .populate("purchaser")
      .populate("products.product")
      .lean();
  }

  async deleteById(id) {
    const res = await Ticket.findOneAndDelete({ $or: [{ _id: id }, { code: id }] });
    return res != null;
  }
}

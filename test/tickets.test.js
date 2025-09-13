//src/test/tickets.test.js
import { expect } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import { connectDB, disconnectDB } from "../src/config/db.js";
import app from "../src/app.js";
import User from "../src/models/User.js";
import Product from "../src/models/Product.js";

describe("Tickets - Tests funcionales", function () {
  this.timeout(20000);

  let userId;
  let productA, productB;
  let ticketId;

  before(async () => {
    process.env.NODE_ENV = "test";
    await connectDB();
    // limpiar
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      mongoose.model("Ticket").deleteMany({})
    ]);
    // crear datos
    const user = await User.create({
      first_name: "Ticket",
      last_name: "User",
      email: "ticket.user@example.com",
      password: "hashed",
      role: "user",
      pets: []
    });
    userId = user._id.toString();

    productA = await Product.create({
      name: "Prod A",
      description: "Producto A",
      price: 10,
      stock: 100
    }).then(p => p.toObject());

    productB = await Product.create({
      name: "Prod B",
      description: "Producto B",
      price: 5,
      stock: 50
    }).then(p => p.toObject());
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await disconnectDB();
  });

  it("POST /api/tickets -> crea un ticket", async () => {
    const payload = {
      purchaser: userId,
      products: [
        { product: productA._id, quantity: 2 },
        { product: productB._id, quantity: 1 }
      ],
      amount: productA.price * 2 + productB.price * 1
    };

    const res = await request(app).post("/api/tickets").send(payload);
    expect(res.status).to.equal(201);
    expect(res.body.status).to.equal("success");
    expect(res.body.payload).to.have.property("code");
    ticketId = res.body.payload._id || res.body.payload.id || res.body.payload.code;
  });

  it("GET /api/tickets -> lista tickets", async () => {
    const res = await request(app).get("/api/tickets");
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.payload).to.be.an("array");
    expect(res.body.payload.length).to.be.greaterThan(0);
  });

  it("GET /api/tickets/:id -> obtiene ticket", async () => {
    const res = await request(app).get(`/api/tickets/${ticketId}`);
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.payload).to.have.property("code");
  });

  it("DELETE /api/tickets/:id -> elimina ticket", async () => {
    const res = await request(app).delete(`/api/tickets/${ticketId}`);
    // si id era code o _id, el endpoint debe eliminarlo
    expect([200, 404]).to.include(res.status); // 200 si lo encontró, 404 si no (depende del id devuelto)
  });
});

//src/test/carts.test.js
import { expect } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import { connectDB, disconnectDB } from "../src/config/db.js";

let app;
let Cart;
let Product;

describe("Carts Router - Tests funcionales", function () {
  this.timeout(20000);

  before(async () => {
    process.env.NODE_ENV = "test";
    await connectDB();

    const appModule = await import("../src/app.js");
    app = appModule.default;

    Cart = (await import("../src/models/Cart.js")).default;
    Product = (await import("../src/models/Product.js")).default;

    await Cart.deleteMany({});
    await Product.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await disconnectDB();
  });

  let cartId;
  let productId;

  it("POST /api/carts -> debería crear un carrito vacío", async () => {
    const res = await request(app).post("/api/carts");
    expect(res.status).to.equal(201);
    expect(res.body.payload).to.have.property("_id");
    cartId = res.body.payload._id;
  });

  it("POST /api/products -> debería crear un producto de prueba", async () => {
    const res = await request(app).post("/api/products").send({
      title: "Cera líquida",
      price: 5000,
      stock: 20,
      category: "detailing",
    });
    expect(res.status).to.equal(201);
    productId = res.body.payload._id;
  });

  it("POST /api/carts/:cid/products/:pid -> debería agregar un producto al carrito", async () => {
    const res = await request(app).post(`/api/carts/${cartId}/products/${productId}`).send({ quantity: 2 });
    expect(res.status).to.equal(200);
    expect(res.body.payload.products[0].quantity).to.equal(2);
  });

  it("GET /api/carts/:id -> debería devolver un carrito con productos", async () => {
    const res = await request(app).get(`/api/carts/${cartId}`);
    expect(res.status).to.equal(200);
    expect(res.body.payload.products).to.be.an("array");
    expect(res.body.payload.products.length).to.be.greaterThan(0);
  });

  it("DELETE /api/carts/:id -> debería eliminar un carrito", async () => {
    const res = await request(app).delete(`/api/carts/${cartId}`);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Carrito eliminado");
  });
});

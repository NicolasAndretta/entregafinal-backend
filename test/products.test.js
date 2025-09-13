//src/test/products.test.js
import { expect } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import { connectDB, disconnectDB } from "../src/config/db.js";

let app;
let Product;

describe("Products Router - Tests funcionales", function () {
  this.timeout(20000);

  before(async () => {
    process.env.NODE_ENV = "test";
    await connectDB();

    const appModule = await import("../src/app.js");
    app = appModule.default;

    Product = (await import("../src/models/Product.js")).default;

    await Product.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await disconnectDB();
  });

  let productId;

  it("POST /api/products -> debería crear un producto", async () => {
    const res = await request(app).post("/api/products").send({
      title: "Shampoo Premium",
      price: 12000,
      stock: 10,
      category: "detailing"
    });

    expect(res.status).to.equal(201);
    expect(res.body.status).to.equal("success");
    expect(res.body.payload).to.have.property("_id");

    productId = res.body.payload._id;
  });

  it("GET /api/products -> debería listar productos", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.be.an("array");
    expect(res.body.payload.length).to.be.greaterThan(0);
  });

  it("GET /api/products/:id -> debería devolver un producto por id", async () => {
    const res = await request(app).get(`/api/products/${productId}`);
    expect(res.status).to.equal(200);
    expect(res.body.payload._id).to.equal(productId);
  });

  it("PUT /api/products/:id -> debería actualizar un producto", async () => {
    const res = await request(app).put(`/api/products/${productId}`).send({ stock: 20 });
    expect(res.status).to.equal(200);
    expect(res.body.payload.stock).to.equal(20);
  });

  it("DELETE /api/products/:id -> debería eliminar un producto", async () => {
    const res = await request(app).delete(`/api/products/${productId}`);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Producto eliminado");
  });
});

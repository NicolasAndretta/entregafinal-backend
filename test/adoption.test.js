// test/adoption.test.js
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Adoptions API", () => {
  let createdAdoptionId = null;
  let testUserId = null;
  let testPetId = null;

  before(async () => {
    // Crear usuario de prueba
    const userRes = await chai.request(app).post("/api/users").send({
      first_name: "Test",
      last_name: "User",
      email: "testadoption@example.com",
      password: "123456"
    });
    testUserId = userRes.body.payload._id;

    // Crear mascota de prueba
    const petRes = await chai.request(app).post("/api/pets").send({
      name: "Mascota Test",
      type: "dog",
      age: 2
    });
    testPetId = petRes.body.payload._id;
  });

  it("POST /api/adoptions → debería crear una adopción", async () => {
    const res = await chai.request(app)
      .post("/api/adoptions")
      .send({ user: testUserId, pet: testPetId });

    expect(res).to.have.status(201);
    expect(res.body).to.have.property("status", "success");
    createdAdoptionId = res.body.payload._id;
  });

  it("GET /api/adoptions → debería listar adopciones", async () => {
    const res = await chai.request(app).get("/api/adoptions");
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("status", "success");
    expect(res.body.payload).to.be.an("array");
  });

  it("GET /api/adoptions/:id → debería obtener una adopción existente", async () => {
    const res = await chai.request(app).get(`/api/adoptions/${createdAdoptionId}`);
    expect(res).to.have.status(200);
    expect(res.body.payload).to.have.property("_id").eql(createdAdoptionId);
  });

  it("GET /api/adoptions/:id → debería dar error con un ID inválido", async () => {
    const res = await chai.request(app).get("/api/adoptions/64b0f7f9c9a1d2b3c4d5e6f7");
    expect(res).to.have.status(404);
  });

  it("DELETE /api/adoptions/:id → debería eliminar la adopción", async () => {
    const res = await chai.request(app).delete(`/api/adoptions/${createdAdoptionId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("message", "Adopción eliminada");
  });

  it("DELETE /api/adoptions/:id → debería dar error al eliminar un ID inexistente", async () => {
    const res = await chai.request(app).delete("/api/adoptions/64b0f7f9c9a1d2b3c4d5e6f7");
    expect(res).to.have.status(404);
  });

  it("POST /api/adoptions → debería fallar si faltan campos", async () => {
    const res = await chai.request(app).post("/api/adoptions").send({ user: testUserId });
    expect(res).to.have.status(400);
  });
});

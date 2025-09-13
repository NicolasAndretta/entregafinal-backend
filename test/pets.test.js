//src/test/pets.test.js
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Pets API", () => {
  let createdPetId = null;

  it("GET /api/pets → debería devolver lista de mascotas", async () => {
    const res = await chai.request(app).get("/api/pets");
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("status", "success");
  });

  it("POST /api/pets → debería crear una mascota", async () => {
    const res = await chai.request(app)
      .post("/api/pets")
      .send({ name: "Firulais", type: "dog", age: 3 });

    expect(res).to.have.status(201);
    createdPetId = res.body.payload._id;
  });

  it("GET /api/pets/:id → debería obtener la mascota creada", async () => {
    const res = await chai.request(app).get(`/api/pets/${createdPetId}`);
    expect(res).to.have.status(200);
    expect(res.body.payload).to.have.property("_id").eql(createdPetId);
  });

  it("PUT /api/pets/:id → debería actualizar la mascota", async () => {
    const res = await chai.request(app)
      .put(`/api/pets/${createdPetId}`)
      .send({ name: "Firulais Updated" });

    expect(res).to.have.status(200);
    expect(res.body.payload.name).to.eql("Firulais Updated");
  });

  it("DELETE /api/pets/:id → debería eliminar la mascota", async () => {
    const res = await chai.request(app).delete(`/api/pets/${createdPetId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("message", "Mascota eliminada");
  });
});

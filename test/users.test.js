  //src/test/
  import chai from "chai";
  import chaiHttp from "chai-http";
  import app from "../app.js";

  chai.use(chaiHttp);
  const expect = chai.expect;

  describe("Users API", () => {
    let createdUserId = null;

    it("GET /api/users → debería devolver lista vacía o con usuarios", async () => {
      const res = await chai.request(app).get("/api/users");
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("status");
    });

    it("POST /api/users → debería crear un usuario", async () => {
      const res = await chai.request(app)
        .post("/api/users")
        .send({
          first_name: "Juan",
          last_name: "Pérez",
          email: `juan${Date.now()}@test.com`,
          password: "123456",
          role: "user"
        });

      expect(res).to.have.status(201);
      expect(res.body.payload).to.have.property("_id");
      createdUserId = res.body.payload._id;
    });

    it("GET /api/users/:id → debería obtener un usuario creado", async () => {
      const res = await chai.request(app).get(`/api/users/${createdUserId}`);
      expect(res).to.have.status(200);
      expect(res.body.payload).to.have.property("_id").eql(createdUserId);
    });

    it("PUT /api/users/:id → debería actualizar un usuario", async () => {
      const res = await chai.request(app)
        .put(`/api/users/${createdUserId}`)
        .send({ first_name: "Juanito" });

      expect(res).to.have.status(200);
      expect(res.body.payload.first_name).to.eql("Juanito");
    });

    it("DELETE /api/users/:id → debería eliminar un usuario", async () => {
      const res = await chai.request(app).delete(`/api/users/${createdUserId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("message", "Usuario eliminado");
    });
  });

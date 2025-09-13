//src/test/chats.test.js
import request from "supertest";
import app from "../app.js"; // corregí la ruta: app.js está en /src, no hace falta ../src

describe("Chats API", () => {
  it("debería crear un nuevo mensaje", async () => {
    const response = await request(app)
      .post("/api/chats")
      .send({ user: "TestUser", message: "Hola mundo" });

    expect(response.status).toBe(201);
    expect(response.body.payload).toHaveProperty("_id");
    expect(response.body.payload.user).toBe("TestUser");
    expect(response.body.payload.message).toBe("Hola mundo");
  });

  it("debería obtener la lista de mensajes", async () => {
    const response = await request(app).get("/api/chats");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.payload)).toBe(true);
  });

  it("debería eliminar todos los mensajes", async () => {
    const response = await request(app).delete("/api/chats");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Todos los chats eliminados");
  });
});

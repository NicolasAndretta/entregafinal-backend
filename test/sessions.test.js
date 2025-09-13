//src/test/sessions.test.js
import request from "supertest";
import app from "../src/app.js";

describe("Sessions API", () => {
  let token = "test-token";

  it("should create a session", async () => {
    const res = await request(app)
      .post("/api/sessions")
      .send({ userId: "12345", token, expiresAt: new Date() });
    expect(res.statusCode).toBe(201);
    expect(res.body.payload).toHaveProperty("token", token);
  });

  it("should get a session", async () => {
    const res = await request(app).get(`/api/sessions/${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.payload).toHaveProperty("token", token);
  });

  it("should delete a session", async () => {
    const res = await request(app).delete(`/api/sessions/${token}`);
    expect(res.statusCode).toBe(200);
  });
});

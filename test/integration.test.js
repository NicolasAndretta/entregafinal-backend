import request from "supertest";
import app from "../app.js";
import { connectDB, disconnectDB } from "../config/db.js";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

describe("API Integration Tests", () => {
  test("GET /api/products debe devolver 200", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
  });

  test("POST /api/users debe crear un usuario", async () => {
    const newUser = {
      first_name: "Juan",
      last_name: "Pérez",
      email: "juan@test.com",
      password: "123456",
      role: "user",
    };

    const res = await request(app).post("/api/users").send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });
});


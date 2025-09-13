//src/config/db.js
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer; // referencia para memoria

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/entregafinal";

export const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "test") {
      // 👉 usar Mongo en memoria para los tests
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("🧪 Conectado a MongoDB en memoria para testing");
    } else {
      // 👉 usar Mongo real en desarrollo/producción
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ Conectado a la base de datos");
    }
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
      console.log("🧪 MongoDB en memoria detenido");
    }
    console.log("🔌 Conexión a la base de datos cerrada");
  } catch (error) {
    console.error("❌ Error cerrando la base de datos:", error);
  }
};

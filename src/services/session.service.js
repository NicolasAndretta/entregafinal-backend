//src/services/session.service.js
import SessionManagerMongo from "../dao/mongodb/SessionManager.js";
import SessionManagerFS from "../dao/filesystem/SessionManager.js";

const persistence = process.env.PERSISTENCE || "MONGO";
let sessionManager;

if (persistence === "FS") {
  sessionManager = new SessionManagerFS();
} else {
  sessionManager = new SessionManagerMongo();
}

export const createSession = (userId, token, expiresAt) =>
  sessionManager.createSession(userId, token, expiresAt);

export const getSessionByToken = (token) =>
  sessionManager.getSessionByToken(token);

export const deleteSession = (token) =>
  sessionManager.deleteSession(token);

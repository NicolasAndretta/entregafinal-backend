//src/dao/filesystem/SessionManager.js
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class SessionManagerFS {
  constructor(path = "./src/dao/filesystem/sessions.json") {
    this.path = path;
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }

  async createSession(userId, token, expiresAt) {
    const sessions = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    const newSession = { id: uuidv4(), userId, token, expiresAt };
    sessions.push(newSession);
    fs.writeFileSync(this.path, JSON.stringify(sessions, null, 2));
    return newSession;
  }

  async getSessionByToken(token) {
    const sessions = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    return sessions.find((s) => s.token === token);
  }

  async deleteSession(token) {
    let sessions = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    sessions = sessions.filter((s) => s.token !== token);
    fs.writeFileSync(this.path, JSON.stringify(sessions, null, 2));
    return true;
  }
}

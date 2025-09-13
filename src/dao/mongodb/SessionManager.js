//src/dao/mongodb/SessionManager.js
import Session from "../../models/Session.js";

export default class SessionManagerMongo {
  async createSession(userId, token, expiresAt) {
    const session = new Session({ user: userId, token, expiresAt });
    return await session.save();
  }

  async getSessionByToken(token) {
    return await Session.findOne({ token }).populate("user");
  }

  async deleteSession(token) {
    return await Session.deleteOne({ token });
  }
}

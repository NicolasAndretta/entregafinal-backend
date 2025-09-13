//src/controllers/session.controller.js
import { createSession, getSessionByToken, deleteSession } from "../services/session.service.js";

export const startSession = async (req, res) => {
  try {
    const { userId, token, expiresAt } = req.body;
    const session = await createSession(userId, token, expiresAt);
    res.status(201).json({ status: "success", payload: session });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const getSession = async (req, res) => {
  try {
    const { token } = req.params;
    const session = await getSessionByToken(token);
    if (!session) {
      return res.status(404).json({ status: "error", message: "Sesión no encontrada" });
    }
    res.json({ status: "success", payload: session });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const endSession = async (req, res) => {
  try {
    const { token } = req.params;
    await deleteSession(token);
    res.json({ status: "success", message: "Sesión eliminada" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

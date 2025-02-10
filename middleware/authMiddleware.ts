import admin from "firebase-admin";
import dotenv from "dotenv";
import { getDefaultResponse } from "../types/responses.js";
import { Request, Response, NextFunction } from "express"
dotenv.config();

export interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json(getDefaultResponse(401, { message: "unauthorized: no token provided" }, true));
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json(getDefaultResponse(403, { message: "unauthorized: invalid token" }, true));
  }
};


import { firebaseApp } from "../config/firebaseConfig.js";
import { Request, Response, NextFunction } from "express";

export interface FirebaseRequest extends Request {
    firebaseApp?: typeof firebaseApp;
}

export const firebaseMiddleware = (req: FirebaseRequest, res: Response, next: NextFunction) => {
    const firebaseReq = req as FirebaseRequest; 
    firebaseReq.firebaseApp = firebaseApp;
    next();
};
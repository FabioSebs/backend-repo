import { firebaseApp, firestore} from "../config/firebaseConfig.js";
import { Request, Response, NextFunction } from "express";

export interface FirebaseRequest extends Request {
    fireStore?: typeof firestore;
}

export const firebaseMiddleware = (req: FirebaseRequest, res: Response, next: NextFunction) => {
    const firebaseReq = req as FirebaseRequest; 
    firebaseReq.fireStore = firestore;
    next();
};
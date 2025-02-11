import { Response } from "express";
import { getDefaultResponse } from "../types/responses.js";
import { FirebaseRequest } from "../middleware/firebaseMiddleware.js";
import { User } from "../entities/user.js";
import { createUser, getUser, updateUser, loginUser } from "../repository/userCollection.js";

const userCollection = "users"

export async function fetchUserData(req: FirebaseRequest, res: Response) {
    const { email } = req.params
    if (!email) {
        return res.status(400).json(getDefaultResponse(400, { message: "invalid email" }, true));
    }

    if (!req.fireStore) {
        return res.status(500).json(getDefaultResponse(500, { message: "Firestore not initialized" }, true));
    }

    return await getUser(res, req.fireStore, userCollection, email)
}

export async function updateUserData(req: FirebaseRequest, res: Response) {
    const { email } = req.params;
    const updateData: Partial<User> = req.body;

    if (!email) {
        return res.status(400).json(getDefaultResponse(400, { message: "invalid email" }, true));
    }
    if (!req.fireStore) {
        return res.status(500).json(getDefaultResponse(500, { message: "Firestore not initialized" }, true));
    }

    return await updateUser(res, req.fireStore, userCollection, email, updateData)
}

export async function registerUserData(req: FirebaseRequest, res: Response) {
    const userData: User = req.body;

    if (!userData.email) {
        return res.status(400).json(getDefaultResponse(400, { message: "invalid email" }, true));
    }

    if (!req.fireStore) {
        return res.status(500).json(getDefaultResponse(500, { message: "Firestore not initialized" }, true));
    }

    return await createUser(res, req.fireStore, userCollection, userData.email, userData)
}

export async function loginUserData(req: FirebaseRequest, res: Response) {
    const userData: User = req.body;

    if (!userData.email) {
        return res.status(400).json(getDefaultResponse(400, { message: "invalid email" }, true));
    }

    if (!req.fireStore) {
        return res.status(500).json(getDefaultResponse(500, { message: "firestore not initialized" }, true));
    }

    return await loginUser(res, req.fireStore, userCollection, userData.email, userData.password);
}
import { firestore } from "../config/firebaseConfig.js"
import { Response } from "express"
import { getDefaultResponse } from "../types/responses.js"
import { User } from "../entities/user.js"
import admin from "firebase-admin";
import bcrypt from "bcrypt"

const SALT_ROUNDS = 10;

export async function getUser(
    res: Response,
    fstore: typeof firestore,
    collection: string,
    email: string
): Promise<Response> {

    try {
        const userRef = fstore.collection(collection).doc(email)
        const user = await userRef?.get()

        if (!user?.exists) {
            return res.status(404).json(getDefaultResponse(400, { message: "user not found" }, true));
        }

        return res.status(200).json(getDefaultResponse(200, user.data(), false))
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json(getDefaultResponse(500, { message: "internal server error" }, true));
    }
}

export async function updateUser(
    res: Response,
    fstore: typeof firestore,
    collection: string,
    email: string,
    newData: Partial<User>
): Promise<Response> {
    try {
        const userRef = fstore.collection(collection).doc(email);
        const userSnap = await userRef?.get();

        if (!userSnap?.exists) {
            return res.status(404).json(getDefaultResponse(404, { message: "user not found" }, true));
        }

        await userRef?.update({
            ...newData,
            updatedAt: new Date(),
        });

        return res.status(200).json(getDefaultResponse(200, { message: "user updated successfully" }, false));
    } catch (error) {
        console.error("error updating user:", error);
        return res.status(500).json(getDefaultResponse(500, { message: "internal server error" }, true));
    }
}

export async function createUser(
    res: Response,
    fstore: typeof firestore,
    collection: string,
    email: string,
    userData: User
): Promise<Response> {
    try {
        const userRef = fstore.collection(collection).doc(email);
        const userSnap = await userRef.get();

        if (userSnap.exists) {
            return res.status(400).json(getDefaultResponse(400, { message: "user already exists" }, true));
        }

        const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);

        const now = new Date();
        const newUser: User = {
            ...userData,
            password: hashedPassword, 
            createdAt: now,
            updatedAt: now,
        };

        await userRef.set(newUser);

        return res.status(201).json(getDefaultResponse(201, { message: "user created successfully" }, false));
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json(getDefaultResponse(500, { message: "internal server error" }, true));
    }
}


export async function loginUser(
    res: Response,
    fstore: typeof firestore,
    collection: string,
    email: string,
    enteredPassword: string
  ): Promise<Response> {
    try {
      const userRef = fstore.collection(collection).doc(email);
      const userSnap = await userRef.get();
  
      if (!userSnap.exists) {
        return res.status(400).json(getDefaultResponse(400, { message: "Invalid email or password" }, true));
      }
  
      const userData = userSnap.data() as User;
      const isPasswordValid = await bcrypt.compare(enteredPassword, userData.password);
  
      if (!isPasswordValid) {
        return res.status(400).json(getDefaultResponse(400, { message: "Invalid email or password" }, true));
      }
  
      // 🔹 Generate a Firebase token for authentication
      const customToken = await admin.auth().createCustomToken(email);
  
      return res.status(200).json(
        getDefaultResponse(200, { message: "Login successful", token: customToken }, false)
      );
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json(getDefaultResponse(500, { message: "Internal server error" }, true));
    }
  }
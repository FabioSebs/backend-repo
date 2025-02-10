import express from "express";
const userRouter = express.Router();
import { authMiddleware } from "../middleware/authMiddleware.js";
import { fetchUserData, updateUserData, createUserData } from "../controller/user.js";

userRouter.get("/fetch-user-data/:email", fetchUserData, authMiddleware)

userRouter.patch("/update-user-data/:email", updateUserData, authMiddleware)

userRouter.post("/create-user-data", createUserData)

export default userRouter
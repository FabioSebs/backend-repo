import express from "express";
const userRouter = express.Router();
import { authMiddleware } from "../middleware/authMiddleware.js";
import { fetchUserData, updateUserData, registerUserData, loginUserData } from "../controller/user.js";

userRouter.get("/fetch-user-data/:email", fetchUserData, authMiddleware)

userRouter.patch("/update-user-data/:email", updateUserData, authMiddleware)

userRouter.post("/register", registerUserData)

userRouter.post("/login", loginUserData)

export default userRouter
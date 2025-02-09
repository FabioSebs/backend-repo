import express from "express";
const userRouter = express.Router();
import { Request, Response } from "express"; 

userRouter.get("fetch-user-data", (req : Request , res : Response) => {
    res.send("")
})

userRouter.patch("update-user-data", (req : Request, res : Response) => {
    res.send("")
})

userRouter.patch("create-user-data", (req : Request, res : Response) => {
    res.send("")
})

export default userRouter
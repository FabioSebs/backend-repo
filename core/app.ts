import express from "express";
import  dotenv from "dotenv";
import { firebaseMiddleware } from "../middleware/firebaseMiddleware.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
import userRouter from "../routes/userRoutes.ts";

// * config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// * middlewares
app.use(express.json());
app.use(authMiddleware)
app.use(firebaseMiddleware)

// * routes
app.use("/v1", userRouter)


// * server run
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});

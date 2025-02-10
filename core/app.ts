import express from "express";
import  dotenv from "dotenv";
import cors from "cors"
import { firebaseMiddleware } from "../middleware/firebaseMiddleware.js";
import userRouter from "../routes/userRoutes.js";

// * config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// * middlewares
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Allow cookies if needed
  }));
app.use(express.json());
app.use(firebaseMiddleware)

// * routes
app.use("/v1", userRouter)


// * server run
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});

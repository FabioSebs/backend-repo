import express from "express";
import  dotenv from "dotenv";
import cors from "cors"
import { firebaseMiddleware } from "../middleware/firebaseMiddleware.js";
import userRouter from "../routes/userRoutes.js";

// * config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// * middlewares
app.use(cors({
    origin: "*", 
    credentials: true, 
  }));
app.use(express.json());
app.use(firebaseMiddleware)

// * routes
app.use("/v1", userRouter)


// * server run
app.listen(PORT as number, "0.0.0.0", () => {
    console.log(`Server is running on port : ${PORT}`);
});

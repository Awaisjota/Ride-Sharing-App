import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import rideRouter from "./routes/rideRouter.js";
dotenv.config();
connectDB();
const app = express();
// Allow frontend origin
app.use(
  cors({
    origin: ["https://havellyride.netlify.app", "http://localhost:5173", "http://localhost:8081"], // remove trailing slash
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", authRouter)
app.use("/api", rideRouter);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is runing on http://localhost:${PORT}`);
});

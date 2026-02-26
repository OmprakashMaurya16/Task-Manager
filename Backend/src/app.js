import express from "express";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));

app.use(
   cors({
      origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
   })
);

import authRoutes from "./routes/auth.routes.js";

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
   res.status(200).json({
      success: true,
      service: "Task Manager API",
   });
});

app.use((err, req, res, next) => {
   const statusCode = err.statusCode || 500;

   res.status(statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",
   });
});

export default app;

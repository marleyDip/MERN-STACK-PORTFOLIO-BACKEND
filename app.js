import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";

// import dbConnection from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";

import messageRouter from "./router/messageRoutes.js";
import projectRouter from "./router/projectRoutes.js";
import skillRouter from "./router/skillRoutes.js";
import applicationRouter from "./router/softwareApplicationRoutes.js";
import timelineRouter from "./router/timelineRoutes.js";
import userRouter from "./router/userRoutes.js";

// dotenv.config({ path: "./config/config.env" });
dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

// Health Check Endpoint for UptimeRobot
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio Server API is healthy and awake!",
  });
});

// Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/softwareapplication", applicationRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/project", projectRouter);

// Health Check Endpoint for Portfolio API
// app.get("/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Portfolio API is healthy",
//     timestamp: new Date().toISOString(),
//   });
// });

// DB connection
// dbConnection();

// Error middleware
app.use(errorMiddleware);

export default app;

/* app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        process.env.PORTFOLIO_URL,
        process.env.DASHBOARD_URL,
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
*/

import express from "express";
import env from "./config/env.js";
import morgan from "morgan";

const createApp = () => {
  const app = express();

  if (env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  app.get("/health", (_req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is healthy",
    });
  });

  return app;
};

export default createApp;

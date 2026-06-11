import express from "express";
import env from "./config/env.js";
import morgan from "morgan";
import securityMiddleware from "./middleware/security.middleware.js";

const createApp = () => {
  const app = express();

  if (env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  securityMiddleware(app);

  app.get("/health", (_req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is healthy",
    });
  });

  return app;
};

export default createApp;

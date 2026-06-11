import express from "express";
import morgan from "morgan";
import { StatusCodes } from "http-status-codes";
import env from "./config/env.js";
import securityMiddleware from "./shared/middleware/security.middleware.js";
import { errorHandler } from "./shared/middleware/errorHandler.middleware.js";

const createApp = () => {
  const app = express();

  if (env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  securityMiddleware(app);

  app.get("/health", (_req, res) => {
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Server is healthy",
    });
  });

  app.use(errorHandler);

  return app;
};

export default createApp;

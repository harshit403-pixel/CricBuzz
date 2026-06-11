import express from "express";
import env from "./config/env.js";
import morgan from "morgan";
import securityMiddleware from "./middleware/security.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { ApiError } from "./utils/apiError.js";

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

  app.get("/test-system-error", (_req, _res) => {
    throw new Error("Something went wrong internally");
  });

  app.get("/test-custom-error", (_req, _res) => {
    throw new ApiError(400, "This is a custom 400 Bad Request error");
  });

  app.use(errorHandler);

  return app;
};

export default createApp;

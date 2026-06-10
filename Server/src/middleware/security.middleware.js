import helmet from "helmet";
import cors from "cors";
import env from "../config/env.js";
import hpp from "hpp";
import compression from "compression";
import express from "express";
import rateLimit from "express-rate-limit";

const securityMiddleware = (app) => {
  app.use(helmet());

  app.use(
    cors({
      origin: env.CORS_ORIGIN.split(",").map((origin) => origin.trim()),
      credentials: true,
    }),
  );

  app.use(
    rateLimit({
      windowMs: env.RATELIMIT_WINDOW_MS,
      limit: env.RATELIMIT_MAX_REQUESTS,
      legacyHeaders: true,
      message: "too many requests, try again after few moments",
    }),
  );

  app.use(hpp());
  app.use(compression());
  app.use(express.json({ limit: "3mb" }));
  app.use(express.urlencoded({ extended: true, limit: "3mb" }));
};

export default securityMiddleware;

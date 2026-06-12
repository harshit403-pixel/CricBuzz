import express from "express";
import morgan from "morgan";
import { StatusCodes } from "http-status-codes";
import env from "./config/env.js";
import teamRoutes from "./modules/team/team.routes.js";
import securityMiddleware from "./shared/middleware/security.middleware.js";
import { errorHandler } from "./shared/middleware/errorHandler.middleware.js";
import handleGoogleAuth from "./modules/auth/strategies/google.strategy.js";
import authRouter from "./modules/auth/auth.route.js";
import userRouter from "./modules/users/user.route.js";

const createApp = () => {
  const app = express();

  if (env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  securityMiddleware(app);

  // initializes passport + google strategy
  handleGoogleAuth(app);

  app.get("/health", (_req, res) => {
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Server is healthy",
    });
  });

  // Team module routes
// Handles team creation, listing, update, and delete APIs.
  app.use("/api/teams", teamRoutes);
  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);

  app.use(errorHandler);

  return app;
};

export default createApp;

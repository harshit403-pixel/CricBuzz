import express from "express";
import morgan from "morgan";
import { StatusCodes } from "http-status-codes";
import env from "./config/env.js";
import securityMiddleware from "./shared/middleware/security.middleware.js";
import { errorHandler } from "./shared/middleware/errorHandler.middleware.js";
import handleGoogleAuth from "./modules/public/auth/strategies/google.strategy.js";
import authRouter from "./modules/public/auth/public.auth.route.js";

import publicTeamRoutes from "./modules/public/team/public.team.routes.js";
import publicPlayerRoutes from "./modules/public/player/public.player.route.js";
import publicSeriesRoutes from "./modules/public/series/public.series.routes.js";
import publicUserRoutes from "./modules/public/users/public.user.route.js";

import privateTeamRoutes from "./modules/private/team/private.team.routes.js";
import privatePlayerRoutes from "./modules/private/player/private.player.route.js";
import privateSeriesRoutes from "./modules/private/series/private.series.routes.js";
// <<<<<<< HEAD
import scoreRoutes from "./modules/private/score/Private.score.route.js";
// =======

import squadRoutes from "./modules/squad/squad.route.js";
// >>>>>>> 8d54cb05ae8100601d841ab6d6d16519bbaf7a88
import sendResponse from "./shared/utils/sendResponse.js";

const createApp = () => {
  const app = express();

  if (env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  securityMiddleware(app); 

  // initializes passport + google strategy
  handleGoogleAuth(app);

  app.get("/health", (_req, res) => {
    sendResponse(res, StatusCodes.OK, "Server is healthy");
  });

  // Public APIs
  app.use("/api/series", publicSeriesRoutes);
  app.use("/api/teams", publicTeamRoutes);
  app.use("/api/players", publicPlayerRoutes);
  app.use("/api/users", publicUserRoutes);

  // Squad Management APIs
  app.use("/api/teams", squadRoutes);

  // Private APIs
  app.use("/api/admin/teams", privateTeamRoutes);
  app.use("/api/admin/players", privatePlayerRoutes);
  app.use("/api/admin/series", privateSeriesRoutes);
  app.use("/api/admin/scores", scoreRoutes);

  app.use("/api/auth", authRouter);
  app.use(errorHandler);

  return app;
};

export default createApp;

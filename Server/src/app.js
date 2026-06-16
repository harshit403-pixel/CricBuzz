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
import publicMatchRoutes from "./modules/public/match/public.match.route.js";
import publicCommentaryRoutes from "./modules/public/commentary/public.commentary.route.js";
import publicHomeRoutes from "./modules/public/home/public.home.route.js";
import publicSearchRoutes from "./modules/public/search/public.search.route.js";

import privateTeamRoutes from "./modules/private/team/private.team.routes.js";
import privatePlayerRoutes from "./modules/private/player/private.player.route.js";
import privateSeriesRoutes from "./modules/private/series/private.series.routes.js";
import privateSquadRoutes from "./modules/private/squad/private.squad.route.js";
import privateScoreRoutes from "./modules/private/score/Private.score.route.js";
import privateMatchRoutes from "./modules/private/match/private.match.route.js";
import privatePlayingXiRoutes from "./modules/private/playingXi/private.playingXi.route.js";
import privateCommentaryRoutes from "./modules/private/commentary/private.commentary.route.js";
import privateUserRoutes from "./modules/private/users/private.user.route.js";

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
  app.use("/api/matches", publicMatchRoutes);
  app.use("/api", publicCommentaryRoutes);
  app.use("/api/home", publicHomeRoutes);
  app.use("/api/search", publicSearchRoutes);

  // Private APIs
  app.use("/api/admin/teams", privateSquadRoutes);
  app.use("/api/admin/teams", privateTeamRoutes);
  app.use("/api/admin/players", privatePlayerRoutes);
  app.use("/api/admin/series", privateSeriesRoutes);
  app.use("/api/admin/scores", privateScoreRoutes);
  app.use("/api/admin/matches", privateMatchRoutes);
  app.use("/api/admin/matches", privatePlayingXiRoutes);
  app.use("/api/admin/commentary", privateCommentaryRoutes);
  app.use("/api/users", privateUserRoutes);

  app.use("/api/auth", authRouter);
  app.use(errorHandler);

  return app;
};

export default createApp;

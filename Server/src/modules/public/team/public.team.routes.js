/**
 * Team Routes
 *
 * Defines Team API endpoints and attaches validation middleware.
 *
 * Route responsibilities:
 * - Define endpoint paths and HTTP methods.
 * - Attach request validation middleware.
 * - Forward valid requests to the controller layer.
 *
 * Base path after registration: /api/teams
 */

import { Router } from "express";
import publicTeamController from "./public.team.controller.js";
import { validateParamId } from "../../../shared/middleware/validateObjectId.middleware.js";

const router = Router();

router.route("/").get(publicTeamController.getAllTeams);

router
  .route("/:id")
  .get(validateParamId("id"), publicTeamController.getTeamById);

router
  .route("/:id/squad")
  .get(validateParamId("id"), publicTeamController.getTeamSquad);

export default router;

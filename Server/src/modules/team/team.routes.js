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
import teamController from "./team.controller.js";
import {
  validateCreateTeam,
  validateUpdateTeam,
} from "./team.validator.js";

const router = Router();

router
  .route("/")
  .get(teamController.getAllTeams)
  .post(validateCreateTeam, teamController.createTeam);

router
  .route("/:id")
  .get(teamController.getTeamById)
  .patch(validateUpdateTeam, teamController.updateTeam)
  .delete(teamController.deleteTeam);

export default router;
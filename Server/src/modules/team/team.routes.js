/**
 * Team Controller
 *
 * Handles HTTP request/response flow for Team APIs.
 * This layer should stay thin and only coordinate between
 * Express routes and the Team service layer.
 *
 * Business rules, database queries, and validation logic should
 * remain outside the controller to keep the module maintainable.
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
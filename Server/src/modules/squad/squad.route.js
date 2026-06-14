/**
 * Squad Routes
 *
 * Registers Squad Management endpoints under the Team resource.
 *
 * Squad data is stored inside Team.squadPlayers, so these routes are
 * mounted with /api/teams from app.js.
 */

import { Router } from "express";

import validateRequest from "../../shared/middleware/validateRequest.middleware.js";
import squadController from "./squad.controller.js";

import {
  addPlayerToSquadSchema,
  removePlayerFromSquadSchema,
  teamIdSchema,
} from "./validators/squad.validator.js";

const router = Router();

router
  .route("/:teamId/squad")
  .get(
    validateRequest(teamIdSchema),
    squadController.getSquad,
  )
  .post(
    validateRequest(addPlayerToSquadSchema),
    squadController.addPlayerToSquad,
  );

router
  .route("/:teamId/squad/:playerId")
  .delete(
    validateRequest(removePlayerFromSquadSchema),
    squadController.removePlayerFromSquad,
  );

export default router;
/**
 * Squad Routes
 *
 * Registers Squad Management endpoints under the Team resource.
 *
 * Squad data is stored inside Team.squadPlayers, so these routes are
 * mounted with /api/teams from app.js.
 */

import { Router } from "express";

import validateRequest from "../../../shared/middleware/validateRequest.middleware.js";
import privateSquadController from "./private.squad.controller.js";

import {
  addPlayerToSquadSchema,
  removePlayerFromSquadSchema,
  teamIdSchema,
} from "./validators/squad.validator.js";
import {
  authenticate,
  authorize,
} from "../../../shared/middleware/auth.middleware.js";
import Roles from "../../../shared/constant/role.constant.js";

const router = Router();

router.use(authenticate, authorize(Roles.SUPER_ADMIN, Roles.ADMIN));

router
  .route("/:teamId/squad")
  .get(validateRequest(teamIdSchema), privateSquadController.getSquad)
  .post(
    validateRequest(addPlayerToSquadSchema),
    privateSquadController.addPlayerToSquad,
  );

router
  .route("/:teamId/squad/:playerId")
  .delete(
    validateRequest(removePlayerFromSquadSchema),
    privateSquadController.removePlayerFromSquad,
  );

export default router;

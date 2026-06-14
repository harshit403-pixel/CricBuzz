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
import privateTeamController from "./private.team.controller.js";
import validateRequest from "../../../shared/middleware/validateRequest.middleware.js";
import { validateParamId } from "../../../shared/middleware/validateObjectId.middleware.js";
import { createTeamSchema } from "./validators/team.validator.js";
import {
  authenticate,
  authorize,
} from "../../../shared/middleware/auth.middleware.js";
import Roles from "../../../shared/constant/role.constant.js";

const router = Router();

router.use(authenticate, authorize(Roles.SUPER_ADMIN, Roles.ADMIN));

router
  .route("/")
  .post(validateRequest(createTeamSchema), privateTeamController.createTeam);

router
  .route("/:id")
  .patch(validateParamId("id"), privateTeamController.updateTeam)
  .delete(validateParamId("id"), privateTeamController.deleteTeam);

export default router;

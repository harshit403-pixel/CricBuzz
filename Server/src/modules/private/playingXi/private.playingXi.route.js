/**
 * Playing XI Routes
 *
 * Handles the private endpoint for selecting Playing XI of a match.
 * The route is mounted under /api/admin/matches from app.js.
 */
import { Router } from "express";

import validateRequest from "../../../shared/middleware/validateRequest.middleware.js";
import {
  authenticate,
  authorize,
} from "../../../shared/middleware/auth.middleware.js";
import Roles from "../../../shared/constant/role.constant.js";

import privatePlayingXiController from "./private.playingXi.controller.js";
import { selectPlayingXiSchema } from "./validators/playingXi.validator.js";

const router = Router();

router.use(authenticate, authorize(Roles.ADMIN, Roles.SUPER_ADMIN));

router
  .route("/:id/playing-xi")
  .post(
    validateRequest(selectPlayingXiSchema),
    privatePlayingXiController.selectPlayingXi,
  );

export default router;
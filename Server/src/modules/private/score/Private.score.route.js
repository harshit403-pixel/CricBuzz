/**
 * Score Routes
 *
 * Base path after registration: /api/scores
 */

import { Router } from "express";
import Roles from "../../../shared/constant/role.constant.js";
import {
  authenticate,
  authorize,
} from "../../../shared/middleware/auth.middleware.js";
import validateRequest from "../../../shared/middleware/validateRequest.middleware.js";
import { validateParamId } from "../../../shared/middleware/validateObjectId.middleware.js";
import scoreController from "./Private.score.controller.js";
import {
  createScoreSchema,
  updateScoreSchema,
} from "./validators/score.validator.js";

const router = Router();

router.use(
  authenticate,
  authorize(Roles.SUPER_ADMIN, Roles.ADMIN, Roles.SCORER),
);

router
  .route("/")
  .post(validateRequest(createScoreSchema), scoreController.createScore);

router
  .route("/:id")
  .patch(
    validateParamId("id"),
    validateRequest(updateScoreSchema),
    scoreController.updateScore,
  );

router
  .route("/match/:matchId")
  .get(validateParamId("matchId"), scoreController.getScoresByMatchId);

export default router;

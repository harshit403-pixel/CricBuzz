import { Router } from "express";
import privatePlayerController from "./private.player.controller.js";
import validateRequest from "../../../shared/middleware/validateRequest.middleware.js";
import { validateParamId } from "../../../shared/middleware/validateObjectId.middleware.js";
import {
  authenticate,
  authorize,
} from "../../../shared/middleware/auth.middleware.js";

import {
  createPlayerSchema,
  updatePlayerSchema,
} from "./validators/player.validator.js";
import Roles from "../../../shared/constant/role.constant.js";

const router = Router();

router.use(authenticate, authorize(Roles.SUPER_ADMIN, Roles.ADMIN));

router
  .route("/")
  .post(
    validateRequest(createPlayerSchema),
    privatePlayerController.createPlayer,
  );

router
  .route("/:id")
  .patch(
    validateParamId("id"),
    validateRequest(updatePlayerSchema),
    privatePlayerController.updatePlayer,
  )
  .delete(validateParamId("id"), privatePlayerController.deletePlayer);

export default router;

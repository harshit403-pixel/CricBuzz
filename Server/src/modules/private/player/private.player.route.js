import { Router } from "express";
import privatePlayerController from "./private.player.controller.js";
import validateRequest from "../../../shared/middleware/validateRequest.middleware.js";
import { validateParamId } from "../../../shared/middleware/validateObjectId.middleware.js";

import {
  createPlayerSchema,
  updatePlayerSchema,
} from "./validators/player.validator.js";

const router = Router();

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

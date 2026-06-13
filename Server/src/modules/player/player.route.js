import { Router } from "express";

import playerController from "./player.controller.js";

import validateRequest from "../../shared/middleware/validateRequest.middleware.js";
 
import {
  createPlayerSchema,
  updatePlayerSchema,
  playerIdSchema,
} from "./validators/player.validator.js";

const router = Router();

router
  .route("/")
  .get(playerController.getAllPlayers)
  .post(
    validateRequest(createPlayerSchema),
    playerController.createPlayer,
  );

router
  .route("/:id")
  .get(
    validateRequest(playerIdSchema),
    playerController.getPlayerById,
  )
  .patch(
    validateRequest(playerIdSchema),
    validateRequest(updatePlayerSchema),
    playerController.updatePlayer,
  )
  .delete(
    validateRequest(playerIdSchema),
    playerController.deletePlayer,
  );

export default router;
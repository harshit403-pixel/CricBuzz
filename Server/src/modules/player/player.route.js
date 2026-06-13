import { Router } from "express";

import playerController from "./player.controller.js";
import {
  validateCreatePlayer,
  validateUpdatePlayer,
} from "./player.validator.js";

const router = Router();

router
  .route("/")
  .get(playerController.getAllPlayers)
  .post(
    validateCreatePlayer,
    playerController.createPlayer,
  );

router
  .route("/:id")
  .get(playerController.getPlayerById)
  .patch(
    validateUpdatePlayer,
    playerController.updatePlayer,
  )
  .delete(playerController.deletePlayer);

export default router;
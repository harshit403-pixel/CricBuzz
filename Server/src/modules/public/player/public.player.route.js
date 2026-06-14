import { Router } from "express";
import publicPlayerController from "./public.player.controller.js";
import { validateParamId } from "../../../shared/middleware/validateObjectId.middleware.js";

const router = Router();

router.route("/").get(publicPlayerController.getAllPlayers);

router
  .route("/:id")
  .get(validateParamId("id"), publicPlayerController.getPlayerById);

export default router;

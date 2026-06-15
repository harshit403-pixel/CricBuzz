import { Router } from "express";
import publicMatchController from "./public.match.controller.js";
import { validateParamId } from "../../../shared/middleware/validateObjectId.middleware.js";

const router = Router();

// get all match route
router.route("/").get(publicMatchController.getMatches);

// get match by id route
router
  .route("/:id")
  .get(validateParamId("id"), publicMatchController.getMatchById);

router
  .route("/:id/center")
  .get(validateParamId("id"), publicMatchController.getMatchCenter);

router
  .route("/:id/scorecard")
  .get(validateParamId("id"), publicMatchController.getMatchScoreCard);

export default router;

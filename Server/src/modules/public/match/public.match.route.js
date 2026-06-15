import { Router } from "express";
import publicMatchController from "./public.match.controller.js";
import { validateParamId } from "../../../shared/middleware/validateObjectId.middleware.js";

const router = Router();

// get all match route
router
  .route("/")
  .get(publicMatchController.getMatches.bind(publicMatchController));

// get match by id route

router
  .route("/:id")
  .get(
    validateParamId("id"),
    publicMatchController.getMatchById.bind(publicMatchController),
  );

export default router;

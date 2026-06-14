/**
 * Series Routes
 *
 * Defines Series API endpoints and attaches validation middleware.
 *
 * Base path after registration: /api/series
 */

import { Router } from "express";
import publicSeriesController from "./public.series.controller.js";
import { validateParamId } from "../../../shared/middleware/validateObjectId.middleware.js";

const router = Router();

router.route("/").get(publicSeriesController.getAllSeries);

router
  .route("/:id")
  .get(validateParamId("id"), publicSeriesController.getSeriesById);

export default router;

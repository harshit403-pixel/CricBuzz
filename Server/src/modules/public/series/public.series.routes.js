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

// get series matches
router
  .route("/:id/matches")
  .get(validateParamId("id"), publicSeriesController.getSeriesMatch);

// get points table of completed match
router.route(
  "/:id/points-table",
  validateParamId("id"),
  publicSeriesController.getPointsTable,
);

export default router;

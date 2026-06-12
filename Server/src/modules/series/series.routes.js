/**
 * Series Routes
 *
 * Defines Series API endpoints and attaches validation middleware.
 *
 * Base path after registration: /api/series
 */

import { Router } from "express";
import Roles from "../../shared/constant/role.constant.js";
import {
  authenticate,
  authorize,
} from "../../shared/middleware/auth.middleware.js";
import seriesController from "./series.controller.js";
import {
  validateCreateSeries,
  validateUpdateSeries,
} from "./series.validator.js";

const router = Router();

router.use(authenticate, authorize(Roles.SUPER_ADMIN, Roles.ADMIN));

router
  .route("/")
  .get(seriesController.getAllSeries)
  .post(validateCreateSeries, seriesController.createSeries);

router
  .route("/:id")
  .get(seriesController.getSeriesById)
  .patch(validateUpdateSeries, seriesController.updateSeries)
  .delete(seriesController.deleteSeries);

export default router;

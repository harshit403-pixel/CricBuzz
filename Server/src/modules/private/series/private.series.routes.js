/**
 * Series Routes
 *
 * Defines Series API endpoints and attaches validation middleware.
 *
 * Base path after registration: /api/series
 */

import { Router } from "express";
import Roles from "../../../shared/constant/role.constant.js";
import {
  authenticate,
  authorize,
} from "../../../shared/middleware/auth.middleware.js";
import privateSeriesController from "./private.series.controller.js";
import validateRequest from "../../../shared/middleware/validateRequest.middleware.js";
import { validateParamId } from "../../../shared/middleware/validateObjectId.middleware.js";
import { createSeriesSchema } from "./validators/series.validator.js";

const router = Router();

router.use(authenticate, authorize(Roles.SUPER_ADMIN, Roles.ADMIN));

router
  .route("/")
  .post(
    validateRequest(createSeriesSchema),
    privateSeriesController.createSeries,
  );

router
  .route("/:id")
  .patch(validateParamId("id"), privateSeriesController.updateSeries)
  .delete(validateParamId("id"), privateSeriesController.deleteSeries);

export default router;

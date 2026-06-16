/**
 * Commentary Routes
 *
 * Handles private commentary endpoints for
 * creating and deleting live match timeline events.
 */

import { Router } from "express";

import Roles from "../../../shared/constant/role.constant.js";
import {
  authenticate,
  authorize,
} from "../../../shared/middleware/auth.middleware.js";
import validateRequest from "../../../shared/middleware/validateRequest.middleware.js";

import privateCommentaryController from "./private.commentary.controller.js";
import {
  createCommentarySchema,
  deleteCommentarySchema,
} from "./validators/commentary.validator.js";

const router = Router();

router.use(
  authenticate,
  authorize(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.SCORER),
);

router
  .route("/")
  .post(
    validateRequest(createCommentarySchema),
    privateCommentaryController.createCommentary,
  );

router
  .route("/:id")
  .delete(
    validateRequest(deleteCommentarySchema),
    privateCommentaryController.deleteCommentary,
  );

export default router;

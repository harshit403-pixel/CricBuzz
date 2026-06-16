import { Router } from "express";
import validateRequest from "../../../shared/middleware/validateRequest.middleware.js";
import {
  completeMatchSchema,
  createMatchSchema,
  matchIdSchema,
  tossSchema,
  updateMatchSchema,
} from "./validators/match.validator.js";
import privateMatchController from "./private.match.controller.js";
import {
  authenticate,
  authorize,
} from "../../../shared/middleware/auth.middleware.js";
import Roles from "../../../shared/constant/role.constant.js";

const router = Router();

// create match route (Admin, super_admin only)
router
  .route("/")
  .post(
    authenticate,
    authorize(Roles.ADMIN, Roles.SUPER_ADMIN),
    validateRequest(createMatchSchema),
    privateMatchController.createMatch.bind(privateMatchController),
  );

// update match route (Admin, super_admin only)
router
  .route("/:id")
  .patch(
    authenticate,
    authorize(Roles.ADMIN, Roles.SUPER_ADMIN),
    validateRequest(matchIdSchema),
    validateRequest(updateMatchSchema),
    privateMatchController.updateMatch.bind(privateMatchController),
  );

// delete match route
router
  .route("/:id")
  .delete(
    authenticate,
    authorize(Roles.ADMIN, Roles.SUPER_ADMIN),
    validateRequest(matchIdSchema),
    privateMatchController.deleteMatch.bind(privateMatchController),
  );

// update toss route (admin, super_admin, scorer)
router
  .route("/:id/toss")
  .patch(
    authenticate,
    authorize(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.SCORER),
    validateRequest(matchIdSchema),
    validateRequest(tossSchema),
    privateMatchController.updateToss.bind(privateMatchController),
  );

// start match route (admin, super_admin, scorer)
router
  .route("/:id/start")
  .patch(
    authenticate,
    authorize(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.SCORER),
    validateRequest(matchIdSchema),
    privateMatchController.startMatch.bind(privateMatchController),
  );

// complete match route (admin, super_admin, scorer)
router
  .route("/:id/complete")
  .patch(
    authenticate,
    authorize(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.SCORER),
    validateRequest(matchIdSchema),
    validateRequest(completeMatchSchema),
    privateMatchController.completeMatch.bind(privateMatchController),
  );

export default router;

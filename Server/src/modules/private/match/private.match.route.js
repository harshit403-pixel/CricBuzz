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

router.use(authenticate, authorize(Roles.ADMIN, Roles.SUPER_ADMIN));

// create match route
router
  .route("/")
  .post(
    validateRequest(createMatchSchema),
    privateMatchController.createMatch.bind(privateMatchController),
  );

// update match route
router
  .route("/:id")
  .patch(
    validateRequest(matchIdSchema),
    validateRequest(updateMatchSchema),
    privateMatchController.updateMatch.bind(privateMatchController),
  );

// delete match route
router
  .route("/:id")
  .delete(
    validateRequest(matchIdSchema),
    privateMatchController.deleteMatch.bind(privateMatchController),
  );

// update toss route
router
  .route("/:id/toss")
  .patch(
    validateRequest(matchIdSchema),
    validateRequest(tossSchema),
    privateMatchController.updateToss.bind(privateMatchController),
  );

// start match route
router
  .route("/:id/start")
  .patch(
    validateRequest(matchIdSchema),
    privateMatchController.startMatch.bind(privateMatchController),
  );

// complete match route
router
  .route("/:id/complete")
  .patch(
    validateRequest(matchIdSchema),
    validateRequest(completeMatchSchema),
    privateMatchController.completeMatch.bind(privateMatchController),
  );

export default router;

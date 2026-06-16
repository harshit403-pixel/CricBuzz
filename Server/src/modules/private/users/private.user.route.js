import { Router } from "express";
import privateUserController from "./private.user.controller.js";
import { validateParamId } from "../../../shared/middleware/validateObjectId.middleware.js";
import {
  authenticate,
  authorize,
} from "../../../shared/middleware/auth.middleware.js";
import Roles from "../../../shared/constant/role.constant.js";

const router = Router();

router.use(authenticate, authorize(Roles.SUPER_ADMIN));

router.get("/", privateUserController.getUsers);
router.patch(
  "/:id/role",
  validateParamId("id"),
  privateUserController.updateRole,
);
router.get("/:id", validateParamId("id"), privateUserController.getUserById);

export default router;

import { Router } from "express";
import {
  authenticate,
  authorize,
} from "../../shared/middleware/auth.middleware.js";
import Roles from "../../shared/constant/role.constant.js";
import userController from "./user.controller.js";
import validateRequest from "../../shared/middleware/validateRequest.middleware.js";
import { userIdSchema } from "./validators/user.validator.js";

const router = Router();

router.use(authenticate, authorize(Roles.SUPER_ADMIN));

router.get("/", userController.getUsers);
router.get("/:id", validateRequest(userIdSchema), userController.getUserById);

export default router;

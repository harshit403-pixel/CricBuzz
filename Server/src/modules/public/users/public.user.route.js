import { Router } from "express";
import publicUserController from "./public.user.controller.js";
import { validateParamId } from "../../../shared/middleware/validateObjectId.middleware.js";

const router = Router();

router.get("/", publicUserController.getUsers);
router.get("/:id", validateParamId("id"), publicUserController.getUserById);

export default router;

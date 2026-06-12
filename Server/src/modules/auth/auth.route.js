import { Router } from "express";
import validateRequest from "../../shared/middleware/validateRequest.middleware.js";
import { registerSchema } from "./validators/auth.validator.js";
import authController from "./auth.controller.js";
import passport from "passport";

const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register.bind(authController),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  authController.googleCallback.bind(authController),
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    prompt: "select_account",
  }),
);

export default router;

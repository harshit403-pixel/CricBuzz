import { Router } from "express";
import validateRequest from "../../shared/middleware/validateRequest.middleware.js";
import { loginSchema, registerSchema } from "./validators/auth.validator.js";
import authController from "./auth.controller.js";
import passport from "passport";

const router = Router();

// register route (manual auth)
router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register.bind(authController),
);

// login route (manual auth)
router.post(
  "/login",
  validateRequest(loginSchema),
  authController.login.bind(authController),
);

// Google redirects here after user grants/denies permission.
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  authController.googleCallback.bind(authController),
);

// Initiates Google OAuth2 flow — redirects user to Google's consent screen.
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    prompt: "select_account",
  }),
);

export default router;

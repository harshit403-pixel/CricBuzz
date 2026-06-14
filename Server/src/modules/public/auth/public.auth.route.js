import { Router } from "express";
import validateRequest from "../../../shared/middleware/validateRequest.middleware.js";
import { loginSchema, registerSchema } from "./validators/auth.validator.js";
import publicAuthController from "./public.auth.controller.js";
import passport from "passport";
import { authenticate } from "../../../shared/middleware/auth.middleware.js";

const router = Router();

// register route (manual auth)
router.post(
  "/register",
  validateRequest(registerSchema),
  publicAuthController.register.bind(publicAuthController),
);

// login route (manual auth)
router.post(
  "/login",
  validateRequest(loginSchema),
  publicAuthController.login.bind(publicAuthController),
);

// Google redirects here after user grants/denies permission.
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  publicAuthController.googleCallback.bind(publicAuthController),
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

// logout route
router.post("/logout", authenticate, publicAuthController.logout);

router.get(
  "/getMe",
  authenticate,
  publicAuthController.getMe.bind(publicAuthController),
);

router.get(
  "/refreshToken",
  publicAuthController.refreshToken.bind(publicAuthController),
);

export default router;

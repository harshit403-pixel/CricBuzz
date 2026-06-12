import { StatusCodes } from "http-status-codes";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import authService from "./auth.service.js";
import { setCookieOptions } from "./utils/cookie.util.js";
import env from "../../config/env.js";

class AuthController {
  constructor() {
    this.register = asyncHandler(this.register.bind(this));
    this.login = asyncHandler(this.login.bind(this));
    this.googleCallback = asyncHandler(this.googleCallback.bind(this));
  }

  async register(req, res) {
    const data = await authService.register(req.validated.body);

    res.cookie(
      "accessToken",
      data.accessToken,
      setCookieOptions(env.ACCESS_TOKEN_EXPIRY),
    );

    res.status(StatusCodes.CREATED).json({
      success: true,
      data,
    });
  }

  async login(req, res) {
    const data = await authService.login(req.validated.body);

    res.cookie(
      "accessToken",
      data.accessToken,
      setCookieOptions(env.ACCESS_TOKEN_EXPIRY),
    );

    res.status(StatusCodes.OK).json({
      success: true,
      data,
    });
  }

  async googleCallback(req, res) {
    const data = await authService.handleGoogleUser(req.user);

    res.cookie(
      "accessToken",
      data.accessToken,
      setCookieOptions(env.ACCESS_TOKEN_EXPIRY),
    );

    res.redirect(env.CLIENT_URL);
  }
}

export default new AuthController();

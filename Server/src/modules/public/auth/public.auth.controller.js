import { StatusCodes } from "http-status-codes";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import publicAuthService from "./public.auth.service.js";
import { clearCookieOptions, setCookieOptions } from "./utils/cookie.util.js";
import env from "../../../config/env.js";
import sendResponse from "../../../shared/utils/sendResponse.js";

class PublicAuthController {
  constructor() {
    this.register = asyncHandler(this.register.bind(this));
    this.login = asyncHandler(this.login.bind(this));
    this.googleCallback = asyncHandler(this.googleCallback.bind(this));
    this.logout = asyncHandler(this.logout.bind(this));
  }

  async register(req, res) {
    const data = await publicAuthService.register(req.validated.body);

    res.cookie(
      "accessToken",
      data.accessToken,
      setCookieOptions(env.ACCESS_TOKEN_EXPIRY),
    );

    res.cookie(
      "refreshToken",
      data.refreshToken,
      setCookieOptions(env.REFRESH_TOKEN_EXPIRY),
    );

    sendResponse(res, StatusCodes.CREATED, "User created successfully", data);
  }

  async login(req, res) {
    const data = await publicAuthService.login(req.validated.body);

    res.cookie(
      "accessToken",
      data.accessToken,
      setCookieOptions(env.ACCESS_TOKEN_EXPIRY),
    );

    res.cookie(
      "refreshToken",
      data.refreshToken,
      setCookieOptions(env.REFRESH_TOKEN_EXPIRY),
    );

    sendResponse(res, StatusCodes.OK, "Logged in successfully", data);
  }

  async googleCallback(req, res) {
    const data = await publicAuthService.handleGoogleUser(req.user);

    res.cookie(
      "accessToken",
      data.accessToken,
      setCookieOptions(env.ACCESS_TOKEN_EXPIRY),
    );

    res.cookie(
      "refreshToken",
      data.refreshToken,
      setCookieOptions(env.REFRESH_TOKEN_EXPIRY),
    );

    res.redirect(env.CLIENT_URL);
  }

  async logout(req, res) {
    res.clearCookie("accessToken", clearCookieOptions());

    sendResponse(res, StatusCodes.OK, "Logged out successfully");
  }
}

export default new PublicAuthController();

import { StatusCodes } from "http-status-codes";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import publicAuthService from "./public.auth.service.js";
import { clearCookieOptions, setCookieOptions } from "./utils/cookie.util.js";
import env from "../../../config/env.js";
import sendResponse from "../../../shared/utils/sendResponse.js";
import UnAuthorizedError from "../../../shared/error/unAuthorized.error.js";

class PublicAuthController {
  constructor() {
    this.register = asyncHandler(this.register.bind(this));
    this.login = asyncHandler(this.login.bind(this));
    this.googleCallback = asyncHandler(this.googleCallback.bind(this));
    this.logout = asyncHandler(this.logout.bind(this));
    this.getMe = asyncHandler(this.getMe.bind(this));
    this.refreshToken = asyncHandler(this.refreshToken.bind(this));
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

  async getMe(req, res) {
    const user = await publicAuthService.getMe(req.user.id);
    sendResponse(res, StatusCodes.OK, "User retrieved successfully", user);
  }

  async refreshToken(req, res) {
    let token = null;

    if (req.cookies && req.cookies.refreshToken) {
      token = req.cookies.refreshToken;
    }

    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new UnAuthorizedError("No refresh token");
    }

    const data = await publicAuthService.refreshAccessToken(token);

    res.cookie(
      "accessToken",
      data.accessToken,
      setCookieOptions(env.ACCESS_TOKEN_EXPIRY),
    );

    sendResponse(
      res,
      StatusCodes.OK,
      "Access token refreshed successfully",
      data,
    );
  }
}

export default new PublicAuthController();

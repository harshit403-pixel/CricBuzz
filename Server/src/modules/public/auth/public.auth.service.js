import userRepository from "../../../repository/user.repository.js";
import BadRequestError from "../../../shared/error/badRequest.error.js";
import bcrypt from "bcryptjs";
import { signToken } from "./utils/token.util.js";
import unAuthorizedError from "../../../shared/error/unAuthorized.error.js";
import env from "../../../config/env.js";
import UnAuthorizedError from "../../../shared/error/unAuthorized.error.js";
import jwt from "jsonwebtoken";

class PublicAuthService {
  // user register manually
  async register(dto) {
    const existing = await userRepository.findByEmail(dto.email);
    if (existing) {
      throw new BadRequestError("Email already in use");
    }

    const hashPassword = await bcrypt.hash(dto.password, 10);
    const user = await userRepository.create({
      ...dto,
      password: hashPassword,
    });

    const accessToken = signToken(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      env.ACCESS_TOKEN_EXPIRY,
    );

    const refreshToken = signToken(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      env.REFRESH_TOKEN_EXPIRY,
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  // user login manually
  async login(dto) {
    const user = await userRepository.findByEmail(dto.email);
    if (!user) {
      throw new unAuthorizedError("Invalid credentials");
    }

    // match hashed password with user's provided password
    const matchedPassword = await bcrypt.compare(dto.password, user.password);
    if (!matchedPassword) {
      throw new unAuthorizedError("Invalid credentials");
    }

    const accessToken = signToken(
      { id: user._id, email: user.email, role: user.role },
      env.ACCESS_TOKEN_EXPIRY,
    );

    const refreshToken = signToken(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      env.REFRESH_TOKEN_EXPIRY,
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  // user register via Google auth
  async handleGoogleUser(profile) {
    let user = await userRepository.findByGoogleId(profile.id);

    if (!user) {
      user = await userRepository.findByEmail(profile.emails[0].value);

      if (user) {
        // existing manual user - link google account
        user = await userRepository.updateById(user._id, {
          googleId: profile.id,
        });
      } else {
        // new user via google
        user = await userRepository.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          password: null,
        });
      }
    }

    const accessToken = signToken(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      env.ACCESS_TOKEN_EXPIRY,
    );

    const refreshToken = signToken(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      env.REFRESH_TOKEN_EXPIRY,
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  // Gets user details
  async getMe(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new UnAuthorizedError("User not found");
    }

    return user;
  }

  async refreshAccessToken(token) {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET);

      const user = await userRepository.findById(decoded.id);
      if (!user || user.isDeleted) {
        throw new UnAuthorizedError("User not found or suspended");
      }

      const accessToken = signToken(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        env.ACCESS_TOKEN_EXPIRY,
      );

      return {
        accessToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      throw new UnAuthorizedError(
        "Session expired or invlaid refresh token. Please log in again.",
      );
    }
  }
}

export default new PublicAuthService();

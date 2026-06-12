import jwt from "jsonwebtoken";
import env from "../../config/env.js";
import UnAuthorizedError from "../error/unAuthorized.error.js";
import ForbiddenError from "../error/forbidden.error.js";

export const authenticate = (req, res, next) => {
  // extract token from cookie or header(fallback)
  let token = null;

  if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (
    !token &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new UnAuthorizedError("Access denied. No token provided");
  }

  try {
    const decoded = jwt.decode(token, env.JWT_SECRET);
    req.user = decoded; // {id, email, role} is attached to the request
  } catch (error) {
    throw new UnAuthorizedError("Invalid or expired token");
  }
};

// restrict access to specific roles (eg. SCORER is not permitted to access admin dashboard)
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ForbiddenError("Access denied. Insufficinet permissions");
    }

    next();
  };
};

import logger from "../config/logger.js";

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    // Express cannot modify the response once headers are sent
    return next(err);
  }

  let { statusCode, message } = err;

  if (!statusCode) {
    statusCode = 500;
    message = "Internal Server Error";
  }

  if (statusCode >= 500) {
    logger.error(
      { err, path: req.originalUrl, method: req.method },
      "Server error caught by global handler",
    );
  } else {
    logger.warn(
      { message, statusCode, path: req.originalUrl },
      "Client error caught by global handler",
    );
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

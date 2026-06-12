/**
 * Async Handler Utility
 *
 * Wraps async Express route handlers and forwards rejected promises
 * to the global error handler using next().
 *
 * This avoids repeating try-catch blocks in every controller method
 * and keeps controllers clean and focused on request/response flow.
 */

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export default asyncHandler;
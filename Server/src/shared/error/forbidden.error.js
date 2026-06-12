import { StatusCodes } from "http-status-codes";
import AppError from "./app.error.js";

export default class ForbiddenError extends AppError {
  constructor(message = "Forbidden", errors = null) {
    super(StatusCodes.FORBIDDEN, message, errors);
  }
}

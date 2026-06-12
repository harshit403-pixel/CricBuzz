import { StatusCodes } from "http-status-codes";
import AppError from "./app.error.js";

export default class NotFoundError extends AppError {
  constructor(message = "Resource not found", errors = null) {
    super(StatusCodes.NOT_FOUND, message, errors);
  }
}

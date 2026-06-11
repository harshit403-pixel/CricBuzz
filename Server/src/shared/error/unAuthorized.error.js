import { StatusCodes } from "http-status-codes";
import AppError from "./app.error.js";

export default class UnAuthorizedError extends AppError {
  constructor(message = "UnAuthorized", errors = null) {
    super(StatusCodes.UNAUTHORIZED, message, errors);
  }
}

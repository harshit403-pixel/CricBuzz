import { StatusCodes } from "http-status-codes";
import AppError from "./app.error.js";

export default class BadRequestError extends AppError {
  constructor(message = "Bad Request", errors = null) {
    super(StatusCodes.BAD_REQUEST, message, errors);
  }
}

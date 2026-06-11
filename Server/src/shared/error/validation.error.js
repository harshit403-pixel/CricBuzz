import { StatusCodes } from "http-status-codes";
import AppError from "./app.error.js";

export default class ValidationError extends AppError {
  constructor(message = "Validation failed") {
    super(StatusCodes.UNPROCESSABLE_ENTITY, message);
  }
}

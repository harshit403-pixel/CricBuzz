import { StatusCodes } from "http-status-codes";
import AppError from "./app.error.js";

export default class NotFound extends AppError {
  constructor(message = "Resource not found") {
    super(StatusCodes.NOT_FOUND, message);
  }
}

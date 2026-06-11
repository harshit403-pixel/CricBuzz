import { StatusCodes } from "http-status-codes";
import AppError from "./app.error.js";

export default class BadRequest extends AppError {
  constructor(message = "Bad Request") {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

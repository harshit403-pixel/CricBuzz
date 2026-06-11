import { StatusCodes } from "http-status-codes";
import AppError from "./app.error.js";

export default class Forbidden extends AppError {
  constructor(message = "Forbidden") {
    super(StatusCodes.FORBIDDEN, message);
  }
}

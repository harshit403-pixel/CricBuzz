import { StatusCodes } from "http-status-codes";
import AppError from "./app.error.js";

export default class UnAuthorized extends AppError {
  constructor(message = "UnAuthorized") {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

import { StatusCodes } from "http-status-codes";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import userService from "./user.service.js";

class UserController {
  constructor() {
    this.getUsers = asyncHandler(this.getUsers.bind(this));
    this.getUserById = asyncHandler(this.getUserById.bind(this));
  }

  async getUsers(req, res) {
    const data = await userService.getUsers();

    res.status(StatusCodes.OK).json({
      success: true,
      data,
    });
  }

  async getUserById(req, res) {
    const data = await userService.getUserById(req.validated.params.id);

    res.status(StatusCodes.OK).json({
      success: true,
      data,
    });
  }
}

export default new UserController();

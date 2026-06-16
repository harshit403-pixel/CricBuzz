import { StatusCodes } from "http-status-codes";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import privateUserService from "./private.user.service.js";
import sendResponse from "../../../shared/utils/sendResponse.js";

class PrivateUserController {
  constructor() {
    this.getUsers = asyncHandler(this.getUsers.bind(this));
    this.getUserById = asyncHandler(this.getUserById.bind(this));
  }

  async updateRole(req, res) {
    const user = await privateUserService.updateRole(
      req.params.id,
      req.body.role,
    );

    sendResponse(res, StatusCodes.OK, "Role updated successfully", user);
  }

  async getUsers(req, res) {
    const data = await privateUserService.getUsers();

    sendResponse(res, StatusCodes.OK, "Users fetched successfully", data);
  }

  async getUserById(req, res) {
    const data = await privateUserService.getUserById(req.params.id);

    sendResponse(res, StatusCodes.OK, "User fetched successfully", data);
  }
}

export default new PrivateUserController();

import { StatusCodes } from "http-status-codes";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import publicUserService from "./public.user.service.js";
import sendResponse from "../../../shared/utils/sendResponse.js";

class PublicUserController {
  constructor() {
    this.getUsers = asyncHandler(this.getUsers.bind(this));
    this.getUserById = asyncHandler(this.getUserById.bind(this));
  }

  async getUsers(req, res) {
    const data = await publicUserService.getUsers();

    sendResponse(res, StatusCodes.OK, "Users fetched successfully", data);
  }

  async getUserById(req, res) {
    const data = await publicUserService.getUserById(req.params.id);

    sendResponse(res, StatusCodes.OK, "User fetched successfully", data);
  }
}

export default new PublicUserController();

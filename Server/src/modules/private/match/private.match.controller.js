import { StatusCodes } from "http-status-codes";
import sendResponse from "../../../shared/utils/sendResponse.js";
import privateMatchService from "./private.match.service.js";
import asyncHandler from "../../../shared/utils/asyncHandler.js";

class PrivateMatchController {
  constructor() {
    this.createMatch = asyncHandler(this.createMatch.bind(this));
    this.updateMatch = asyncHandler(this.updateMatch.bind(this));
    this.deleteMatch = asyncHandler(this.deleteMatch.bind(this));
    this.updateToss = asyncHandler(this.updateToss.bind(this));
    this.startMatch = asyncHandler(this.startMatch.bind(this));
    this.completeMatch = asyncHandler(this.completeMatch.bind(this));
  }

  async createMatch(req, res) {
    const match = await privateMatchService.createMatch(
      req.validated.body,
      req.user,
    );

    sendResponse(res, StatusCodes.CREATED, "Match created succussfully", match);
  }

  async updateMatch(req, res) {
    const match = await privateMatchService.updateMatch(
      req.params.id,
      req.validated.body,
      req.user,
    );

    sendResponse(res, StatusCodes.OK, "Match updated succussfully", match);
  }

  async deleteMatch(req, res) {
    const match = await privateMatchService.deleteMatch(
      req.params.id,
      req.user,
    );

    sendResponse(res, StatusCodes.OK, "Match deleted successfully", match);
  }

  async updateToss(req, res) {
    const match = await privateMatchService.updateToss(
      req.params.id,
      req.validated.body,
      req.user,
    );

    sendResponse(
      res,
      StatusCodes.OK,
      "Toss details updated successfully",
      match,
    );
  }

  async startMatch(req, res) {
    const match = await privateMatchService.startMatch(req.params.id, req.user);

    sendResponse(res, StatusCodes.OK, "Match started successfully", match);
  }

  async completeMatch(req, res) {
    const match = await privateMatchService.completeMatch(
      req.params.id,
      req.validated.body,
      req.user,
    );

    sendResponse(res, StatusCodes.OK, "Match completed successfully", match);
  }
}

export default new PrivateMatchController();

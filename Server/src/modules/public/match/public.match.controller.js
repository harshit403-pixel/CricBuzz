import { StatusCodes } from "http-status-codes";
import sendResponse from "../../../shared/utils/sendResponse.js";
import publicMatchService from "./public.match.service.js";
import asyncHandler from "../../../shared/utils/asyncHandler.js";

class PrivateMatchController {
  constructor() {
    this.getMatches = asyncHandler(this.getMatches.bind(this));
    this.getMatchById = asyncHandler(this.getMatchById.bind(this));
  }

  async getMatches(req, res) {
    const matches = await publicMatchService.getMatches();

    sendResponse(res, StatusCodes.OK, "Matches fetched succussfully", matches);
  }

  async getMatchById(req, res) {
    const match = await publicMatchService.getMatchById(req.params.id);

    sendResponse(res, StatusCodes.OK, "Match fetched succussfully", match);
  }
}

export default new PrivateMatchController();

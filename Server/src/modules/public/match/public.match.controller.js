import { StatusCodes } from "http-status-codes";
import sendResponse from "../../../shared/utils/sendResponse.js";
import publicMatchService from "./public.match.service.js";
import asyncHandler from "../../../shared/utils/asyncHandler.js";

class PublicMatchController {
  constructor() {
    this.getMatches = asyncHandler(this.getMatches.bind(this));
    this.getMatchById = asyncHandler(this.getMatchById.bind(this));
    this.getMatchCenter = asyncHandler(this.getMatchCenter.bind(this));
    this.getMatchScoreCard = asyncHandler(this.getMatchScoreCard.bind(this));
  }

  async getMatches(req, res) {
    const matches = await publicMatchService.getMatches(req.query.status);

    sendResponse(res, StatusCodes.OK, "Matches fetched succussfully", matches);
  }

  async getMatchById(req, res) {
    const match = await publicMatchService.getMatchById(req.params.id);

    sendResponse(res, StatusCodes.OK, "Match fetched succussfully", match);
  }

  async getMatchCenter(req, res) {
    const match = await publicMatchService.getMatchCenter(req.params.id);

    sendResponse(
      res,
      StatusCodes.Ok,
      "Match center is retrieved successfully",
      match,
    );
  }

  async getMatchScoreCard(req, res) {
    const match = await publicMatchService.getMatchScoreCard(req.params.id);

    sendResponse(res, StatusCodes.Ok, "Match scores are fetched", match);
  }
}

export default new PublicMatchController();

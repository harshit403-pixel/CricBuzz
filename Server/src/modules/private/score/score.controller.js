/**
 * Score Controller
 *
 * Handles HTTP request/response flow for Score APIs.
 */

import { StatusCodes } from "http-status-codes";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import sendResponse from "../../../shared/utils/sendResponse.js";
import scoreService from "./score.service.js";

class ScoreController {
  createScore = asyncHandler(async (req, res) => {
    const score = await scoreService.createScore(req.validated.body);

    sendResponse(res, StatusCodes.CREATED, "Score created successfully", score);
  });

  updateScore = asyncHandler(async (req, res) => {
    const score = await scoreService.updateScore(
      req.params.id,
      req.validated.body,
    );

    sendResponse(res, StatusCodes.OK, "Score updated successfully", score);
  });

  getScoresByMatchId = asyncHandler(async (req, res) => {
    const scores = await scoreService.getScoresByMatchId(req.params.matchId);

    sendResponse(res, StatusCodes.OK, "Scores fetched successfully", scores);
  });
}

export default new ScoreController();

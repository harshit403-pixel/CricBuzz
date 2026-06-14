/**
 * Squad Controller
 *
 * Handles HTTP request/response flow for Squad Management APIs.
 *
 * Controllers stay thin:
 * - Read params/body.
 * - Call the service layer.
 * - Send standardized API responses.
 */

import { StatusCodes } from "http-status-codes";

import asyncHandler from "../../shared/utils/asyncHandler.js";
import sendResponse from "../../shared/utils/sendResponse.js";
import squadService from "./squad.service.js";

class SquadController {
  getSquad = asyncHandler(async (req, res) => {
    const squad = await squadService.getSquad(req.params.teamId);

    sendResponse(
      res,
      StatusCodes.OK,
      "Squad fetched successfully",
      squad,
    );
  });

  addPlayerToSquad = asyncHandler(async (req, res) => {
    const squad = await squadService.addPlayerToSquad(
      req.params.teamId,
      req.validated.body.playerId,
      req.user?._id,
    );

    sendResponse(
      res,
      StatusCodes.OK,
      "Player added to squad successfully",
      squad,
    );
  });

  removePlayerFromSquad = asyncHandler(async (req, res) => {
    const squad = await squadService.removePlayerFromSquad(
      req.params.teamId,
      req.params.playerId,
      req.user?._id,
    );

    sendResponse(
      res,
      StatusCodes.OK,
      "Player removed from squad successfully",
      squad,
    );
  });
}

export default new SquadController();
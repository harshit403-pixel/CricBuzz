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
import squadService from "./squad.service.js";

class SquadController {
  getSquad = asyncHandler(async (req, res) => {
    const squad = await squadService.getSquad(req.params.teamId);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Squad fetched successfully",
      data: squad,
    });
  });

  addPlayerToSquad = asyncHandler(async (req, res) => {
    const squad = await squadService.addPlayerToSquad(
      req.params.teamId,
      req.validated.body.playerId,
      req.user?._id,
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Player added to squad successfully",
      data: squad,
    });
  });

  removePlayerFromSquad = asyncHandler(async (req, res) => {
    const squad = await squadService.removePlayerFromSquad(
      req.params.teamId,
      req.params.playerId,
      req.user?._id,
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Player removed from squad successfully",
      data: squad,
    });
  });
}

export default new SquadController();
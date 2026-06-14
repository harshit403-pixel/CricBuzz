/**
 * Team Controller
 *
 * Handles HTTP request/response flow for Team APIs.
 *
 * Controller responsibilities:
 * - Read request data from params/body.
 * - Call the Team service layer.
 * - Send standardized API responses.
 *
 * Business logic, database queries, and validation rules should stay
 * outside controllers to keep this layer thin and maintainable.
 */

import { StatusCodes } from "http-status-codes";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import publicTeamService from "./public.team.service.js";
import sendResponse from "../../../shared/utils/sendResponse.js";

class TeamController {
  getAllTeams = asyncHandler(async (_req, res) => {
    const teams = await publicTeamService.getAllTeams();

    sendResponse(res, StatusCodes.OK, "Teams fetched successfully", teams);
  });

  getTeamById = asyncHandler(async (req, res) => {
    const team = await publicTeamService.getTeamById(req.params.id);

    sendResponse(res, StatusCodes.OK, "Team fetched successfully", team);
  });
}

export default new TeamController();

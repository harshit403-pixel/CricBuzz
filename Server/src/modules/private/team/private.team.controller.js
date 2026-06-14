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
import privateTeamService from "./private.team.service.js";
import sendResponse from "../../../shared/utils/sendResponse.js";

class PrivateTeamController {
  createTeam = asyncHandler(async (req, res) => {
    const team = await privateTeamService.createTeam(req.body);

    sendResponse(res, StatusCodes.CREATED, "Team created successfully", team);
  });

  updateTeam = asyncHandler(async (req, res) => {
    const team = await privateTeamService.updateTeam(req.params.id, req.body);

    sendResponse(res, StatusCodes.OK, "Team updated successfully", team);
  });

  deleteTeam = asyncHandler(async (req, res) => {
    await privateTeamService.deleteTeam(req.params.id);

    sendResponse(res, StatusCodes.OK, "Team deleted successfully");
  });
}

export default new PrivateTeamController();

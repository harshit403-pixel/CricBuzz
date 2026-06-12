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
import asyncHandler from "../../shared/utils/asyncHandler.js";
import teamService from "./team.service.js";

class TeamController {
  createTeam = asyncHandler(async (req, res) => {
    const team = await teamService.createTeam(req.body);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Team created successfully",
      data: team,
    });
  });

  getAllTeams = asyncHandler(async (_req, res) => {
    const teams = await teamService.getAllTeams();

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Teams fetched successfully",
      data: teams,
    });
  });

  getTeamById = asyncHandler(async (req, res) => {
    const team = await teamService.getTeamById(req.params.id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Team fetched successfully",
      data: team,
    });
  });

  updateTeam = asyncHandler(async (req, res) => {
    const team = await teamService.updateTeam(req.params.id, req.body);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Team updated successfully",
      data: team,
    });
  });

  deleteTeam = asyncHandler(async (req, res) => {
    await teamService.deleteTeam(req.params.id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Team deleted successfully",
    });
  });
}

export default new TeamController();
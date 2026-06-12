/**
 * Team Controller
 *
 * Handles HTTP request/response flow for Team APIs.
 * This layer should stay thin and only coordinate between
 * Express routes and the Team service layer.
 *
 * Business rules, database queries, and validation logic should
 * remain outside the controller to keep the module maintainable.
 */
import { StatusCodes } from "http-status-codes";
import teamService from "./team.service.js";

class TeamController {
  createTeam = async (req, res, next) => {
    try {
      const team = await teamService.createTeam(req.body);

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Team created successfully",
        data: team,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllTeams = async (_req, res, next) => {
    try {
      const teams = await teamService.getAllTeams();

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Teams fetched successfully",
        data: teams,
      });
    } catch (error) {
      next(error);
    }
  };

  getTeamById = async (req, res, next) => {
    try {
      const team = await teamService.getTeamById(req.params.id);

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Team fetched successfully",
        data: team,
      });
    } catch (error) {
      next(error);
    }
  };

  updateTeam = async (req, res, next) => {
    try {
      const team = await teamService.updateTeam(req.params.id, req.body);

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Team updated successfully",
        data: team,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteTeam = async (req, res, next) => {
    try {
      await teamService.deleteTeam(req.params.id);

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Team deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new TeamController();
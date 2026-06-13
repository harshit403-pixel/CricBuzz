import { StatusCodes } from "http-status-codes";

import asyncHandler from "../../shared/utils/asyncHandler.js";
import playerService from "./player.service.js";

class PlayerController {
  createPlayer = asyncHandler(async (req, res) => {
    const player = await playerService.createPlayer(req.validated.body);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Player created successfully",
      data: player,
    });
  });

  getAllPlayers = asyncHandler(async (_req, res) => {
    const players = await playerService.getAllPlayers();

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Players fetched successfully",
      data: players,
    });
  });

  getPlayerById = asyncHandler(async (req, res) => {
    const player = await playerService.getPlayerById(req.params.id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Player fetched successfully",
      data: player,
    });
  });

  updatePlayer = asyncHandler(async (req, res) => {
    const player = await playerService.updatePlayer(
      req.params.id,
      req.validated.body,
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Player updated successfully",
      data: player,
    });
  });

  deletePlayer = asyncHandler(async (req, res) => {
    await playerService.deletePlayer(
      req.params.id,
      req.user?._id,
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Player deleted successfully",
    });
  });
}

export default new PlayerController();
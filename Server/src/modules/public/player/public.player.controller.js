import { StatusCodes } from "http-status-codes";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import publicPlayerService from "./public.player.service.js";
import sendResponse from "../../../shared/utils/sendResponse.js";

class PublicPlayerController {
  getAllPlayers = asyncHandler(async (_req, res) => {
    const players = await publicPlayerService.getAllPlayers();

    sendResponse(res, StatusCodes.OK, "Players fetched successfully", players);
  });

  getPlayerById = asyncHandler(async (req, res) => {
    const player = await publicPlayerService.getPlayerById(req.params.id);

    sendResponse(res, StatusCodes.OK, "Player fetched successfully", player);
  });
}

export default new PublicPlayerController();

import { StatusCodes } from "http-status-codes";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import privatePlayerService from "./private.player.service.js";
import sendResponse from "../../../shared/utils/sendResponse.js";

class PrivatePlayerController {
  createPlayer = asyncHandler(async (req, res) => {
    const player = await privatePlayerService.createPlayer(req.validated.body);

    sendResponse(
      res,
      StatusCodes.CREATED,
      "Player created successfully",
      player,
    );
  });

  updatePlayer = asyncHandler(async (req, res) => {
    const player = await privatePlayerService.updatePlayer(
      req.params.id,
      req.validated.body,
    );

    sendResponse(res, StatusCodes.OK, "Player updated successfully", player);
  });

  deletePlayer = asyncHandler(async (req, res) => {
    await privatePlayerService.deletePlayer(req.params.id, req.user?._id);

    sendResponse(res, StatusCodes.OK, "Player deleted successfully");
  });
}

export default new PrivatePlayerController();

/**
 * Playing XI Controller
 *
 * Receives the match id and validated request body,
 * then passes the selection request to the service layer.
 */
import { StatusCodes } from "http-status-codes";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import sendResponse from "../../../shared/utils/sendResponse.js";
import privatePlayingXiService from "./private.playingXi.service.js";

class PrivatePlayingXiController {
  selectPlayingXi = asyncHandler(async (req, res) => {
    const match = await privatePlayingXiService.selectPlayingXi(
      req.params.id,
      req.validated.body,
      req.user,
    );

    sendResponse(
      res,
      StatusCodes.OK,
      "Playing XI selected successfully",
      match,
    );
  });
}

export default new PrivatePlayingXiController();
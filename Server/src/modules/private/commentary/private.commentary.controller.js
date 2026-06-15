/**
 * Commentary Controller
 *
 * Receives admin commentary requests and
 * passes the validated data to service layer.
 */

import { StatusCodes } from "http-status-codes";

import asyncHandler from "../../../shared/utils/asyncHandler.js";
import sendResponse from "../../../shared/utils/sendResponse.js";
import privateCommentaryService from "./private.commentary.service.js";

class PrivateCommentaryController {
  createCommentary = asyncHandler(async (req, res) => {
    const commentary = await privateCommentaryService.createCommentary(
      req.validated.body,
      req.user,
    );

    sendResponse(
      res,
      StatusCodes.CREATED,
      "Commentary created successfully",
      commentary,
    );
  });

  deleteCommentary = asyncHandler(async (req, res) => {
    const commentary = await privateCommentaryService.deleteCommentary(
      req.params.id,
      req.user,
    );

    sendResponse(
      res,
      StatusCodes.OK,
      "Commentary deleted successfully",
      commentary,
    );
  });
}

export default new PrivateCommentaryController();
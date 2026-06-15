/**
 * Public Commentary Controller
 *
 * Handles public requests for match commentary
 * and returns timeline data for live match page.
 */

import { StatusCodes } from "http-status-codes";

import asyncHandler from "../../../shared/utils/asyncHandler.js";
import sendResponse from "../../../shared/utils/sendResponse.js";
import publicCommentaryService from "./public.commentary.service.js";

class PublicCommentaryController {
  getMatchCommentary = asyncHandler(async (req, res) => {
    const commentary = await publicCommentaryService.getMatchCommentary(
      req.params.id,
    );

    sendResponse(
      res,
      StatusCodes.OK,
      "Commentary fetched successfully",
      commentary,
    );
  });
}

export default new PublicCommentaryController();
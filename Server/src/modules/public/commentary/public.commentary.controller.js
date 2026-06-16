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
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;

    const result = await publicCommentaryService.getMatchCommentary(
      req.params.id,
      page,
      limit,
    );

    sendResponse(
      res,
      StatusCodes.OK,
      "Commentary fetched successfully",
      result,
    );
  });
}

export default new PublicCommentaryController();

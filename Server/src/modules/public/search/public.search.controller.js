import publicSearchService from "./public.search.service.js";
import sendResponse from "../../../shared/utils/sendResponse.js";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "../../../shared/utils/asyncHandler.js";

class PublicSearchController {
  constructor() {
    this.search = asyncHandler(this.search.bind(this));
  }

  async search(req, res) {
    const searchedItem = await publicSearchService.search(req.query.q);

    sendResponse(
      res,
      StatusCodes.OK,
      "search result fetched successfully",
      searchedItem,
    );
  }
}

export default new PublicSearchController();

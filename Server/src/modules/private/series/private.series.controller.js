/**
 * Series Controller
 *
 * Handles HTTP request/response flow for Series APIs.
 */

import { StatusCodes } from "http-status-codes";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import privateSeriesService from "./private.series.service.js";
import sendResponse from "../../../shared/utils/sendResponse.js";

class PrivateSeriesController {
  createSeries = asyncHandler(async (req, res) => {
    const series = await privateSeriesService.createSeries(req.body, req.user);

    sendResponse(
      res,
      StatusCodes.CREATED,
      "Series created successfully",
      series,
    );
  });

  updateSeries = asyncHandler(async (req, res) => {
    const series = await privateSeriesService.updateSeries(
      req.params.id,
      req.body,
      req.user,
    );

    sendResponse(res, StatusCodes.OK, "Series updated successfully", series);
  });

  deleteSeries = asyncHandler(async (req, res) => {
    await privateSeriesService.deleteSeries(req.params.id, req.user);

    sendResponse(res, StatusCodes.OK, "Series deleted successfully");
  });
}

export default new PrivateSeriesController();

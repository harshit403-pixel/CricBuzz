/**
 * Series Controller
 *
 * Handles HTTP request/response flow for Series APIs.
 */

import { StatusCodes } from "http-status-codes";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import publicSeriesService from "./public.series.service.js";
import sendResponse from "../../../shared/utils/sendResponse.js";

class PublicSeriesController {
  getAllSeries = asyncHandler(async (_req, res) => {
    const series = await publicSeriesService.getAllSeries();

    sendResponse(res, StatusCodes.OK, "Series fetched successfully", series);
  });

  getSeriesById = asyncHandler(async (req, res) => {
    const series = await publicSeriesService.getSeriesById(req.params.id);

    sendResponse(res, StatusCodes.OK, "Series fetched successfully", series);
  });

  getSeriesMatch = asyncHandler(async (req, res) => {
    const seriesMatches = await publicSeriesService.getSeriesById(
      req.params.id,
    );

    sendResponse(
      res,
      StatusCodes.OK,
      "series matches fetched successfully",
      seriesMatches,
    );
  });

  getPointsTable = asyncHandler(async (req, res) => {
    const pointsTable = await publicSeriesService.getSeriesMatches(
      req.params.id,
    );

    sendResponse(
      res,
      StatusCodes.OK,
      "Points Table fetched successfully",
      pointsTable,
    );
  });
}

export default new PublicSeriesController();

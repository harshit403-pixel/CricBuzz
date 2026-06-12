/**
 * Series Controller
 *
 * Handles HTTP request/response flow for Series APIs.
 */

import { StatusCodes } from "http-status-codes";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import seriesService from "./series.service.js";

class SeriesController {
  createSeries = asyncHandler(async (req, res) => {
    const series = await seriesService.createSeries(req.body, req.user);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Series created successfully",
      data: series,
    });
  });

  getAllSeries = asyncHandler(async (_req, res) => {
    const series = await seriesService.getAllSeries();

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Series fetched successfully",
      data: series,
    });
  });

  getSeriesById = asyncHandler(async (req, res) => {
    const series = await seriesService.getSeriesById(req.params.id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Series fetched successfully",
      data: series,
    });
  });

  updateSeries = asyncHandler(async (req, res) => {
    const series = await seriesService.updateSeries(
      req.params.id,
      req.body,
      req.user,
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Series updated successfully",
      data: series,
    });
  });

  deleteSeries = asyncHandler(async (req, res) => {
    await seriesService.deleteSeries(req.params.id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Series deleted successfully",
    });
  });
}

export default new SeriesController();

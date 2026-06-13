/**
 * Series Service
 *
 * Contains business logic for the Series module.
 *
 * Responsibilities:
 * - Validate route parameters.
 * - Enforce unique name and season.
 * - Handle not-found cases.
 * - Coordinate repository calls.
 */

import mongoose from "mongoose";
import BadRequest from "../../shared/error/badRequest.error.js";
import NotFound from "../../shared/error/notFound.error.js";
import seriesRepository from "./series.repository.js";

class SeriesService {
  validateObjectId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequest("Invalid series id");
    }
  }

  async createSeries(data, user) {
    const existingSeries =
      await seriesRepository.findByNameOrShortNameOrSeason(
      data.name,
      data.shortName,
      data.season,
    );

    if (existingSeries) {
      throw new BadRequest(
        "Series with this name, short name, or season already exists",
      );
    }

    return seriesRepository.create({
      ...data,
      createdBy: user?.id,
    });
  }

  async getAllSeries() {
    return seriesRepository.findAll();
  }

  async getSeriesById(id) {
    this.validateObjectId(id);

    const series = await seriesRepository.findById(id);

    if (!series) {
      throw new NotFound("Series not found");
    }

    return series;
  }

  async updateSeries(id, data, user) {
    this.validateObjectId(id);

    const existingSeries = await seriesRepository.findById(id);

    if (!existingSeries) {
      throw new NotFound("Series not found");
    }

    if (data.name || data.shortName || data.season) {
      const duplicateSeries = await seriesRepository.findDuplicateForUpdate(
        id,
        data.name || existingSeries.name,
        data.shortName || existingSeries.shortName,
        data.season || existingSeries.season,
      );

      if (duplicateSeries) {
        throw new BadRequest(
          "Series with this name, short name, or season already exists",
        );
      }
    }

    return seriesRepository.updateById(id, {
      ...data,
      updatedBy: user?.id,
    });
  }

  async deleteSeries(id, user) {
    this.validateObjectId(id);

    const hasMatches = await seriesRepository.hasActiveMatches(id);

    if (hasMatches) {
      throw new BadRequest("Series cannot be deleted because matches exist");
    }

    const series = await seriesRepository.deleteById(id, user?.id);

    if (!series) {
      throw new NotFound("Series not found");
    }

    return series;
  }
}

export default new SeriesService();
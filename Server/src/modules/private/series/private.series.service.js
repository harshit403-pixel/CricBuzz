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

import BadRequestError from "../../../shared/error/badRequest.error.js";
import NotFoundError from "../../../shared/error/notFound.error.js";
import seriesRepository from "../../../repository/series.repository.js";

class PrivateSeriesService {
  async createSeries(data, user) {
    const existingSeries = await seriesRepository.findByNameOrShortNameOrSeason(
      data.name,
      data.shortName,
      data.season,
    );

    if (existingSeries) {
      throw new BadRequestError(
        "Series with this name or short name already exists for this season",
      );
    }

    return seriesRepository.create({
      ...data,
      createdBy: user?.id,
    });
  }

  async updateSeries(id, data, user) {
    const existingSeries = await seriesRepository.findById(id);

    if (!existingSeries) {
      throw new NotFoundError("Series not found");
    }

    if (data.name || data.shortName || data.season) {
      const duplicateSeries = await seriesRepository.findDuplicateForUpdate(
        id,
        data.name || existingSeries.name,
        data.shortName || existingSeries.shortName,
        data.season || existingSeries.season,
      );

      if (duplicateSeries) {
        throw new BadRequestError(
          "Series with this name or short name already exists for this season",
        );
      }
    }

    return seriesRepository.updateById(id, {
      ...data,
      updatedBy: user?.id,
    });
  }

  async deleteSeries(id, user) {
    const hasMatches = await seriesRepository.hasActiveMatches(id);

    if (hasMatches) {
      throw new BadRequestError(
        "Series cannot be deleted because matches exist",
      );
    }

    const series = await seriesRepository.deleteById(id, user?.id);

    if (!series) {
      throw new NotFoundError("Series not found");
    }

    return series;
  }
}

export default new PrivateSeriesService();

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

import NotFoundError from "../../../shared/error/notFound.error.js";
import seriesRepository from "../../../repository/series.repository.js";

class PublicSeriesService {
  async getAllSeries() {
    return seriesRepository.findAll();
  }

  async getSeriesById(id) {
    const series = await seriesRepository.findById(id);

    if (!series) {
      throw new NotFoundError("Series not found");
    }

    return series;
  }
}

export default new PublicSeriesService();

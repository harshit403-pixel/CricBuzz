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
import matchRepository from "../../../repository/match.repository.js";
import MATCH_STATUS from "../../../shared/constant/match.constant.js";

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

  async getSeriesMatches(seriesId) {
    // checks if exists
    await this.getSeriesById(seriesId);

    return await matchRepository.findBySeriesId(seriesId);
  }

  // Generate points table from all completed matches in a series
  async getPointsTable(seriesId) {
    const matches = await this.getSeriesMatches(seriesId);

    // Only completed matches affect the points table
    const completedMatches = matches.filter(
      (match) => match.status === "COMPLETED",
    );

    const tableMap = {};

    completedMatches.forEach((match) => {
      const { team1, team2, winner } = match;

      // Create table entries for teams if they don't exist yet
      [team1, team2].forEach((team) => {
        const teamId = team._id.toString();

        if (!tableMap[teamId]) {
          tableMap[teamId] = {
            team,
            played: 0,
            won: 0,
            lost: 0,
            points: 0,
          };
        }
      });

      const team1Id = team1._id.toString();
      const team2Id = team2._id.toString();

      // Both teams have played one match
      tableMap[team1Id].played += 1;
      tableMap[team2Id].played += 1;

      // Update win/loss statistics
      if (winner) {
        const winnerId = winner._id.toString();
        const loserId = winnerId === team1Id ? team2Id : team1Id;

        tableMap[winnerId].won += 1;
        tableMap[winnerId].points += 2; // 2 points for a win

        tableMap[loserId].lost += 1;
      }
    });

    // Sort by points first, then by wins as a tie-breaker
    return Object.values(tableMap).sort(
      (a, b) => b.points - a.points || b.won - a.won,
    );
  }
}

export default new PublicSeriesService();

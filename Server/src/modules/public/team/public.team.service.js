/**
 * Team Service
 *
 * Contains business logic for the Team module.
 *
 * Service responsibilities:
 * - Validate route parameters.
 * - Handle duplicate team checks.
 * - Handle not-found cases.
 * - Coordinate repository calls.
 *
 * Controllers should call this service instead of accessing
 * repositories or models directly.
 */

import NotFoundError from "../../../shared/error/notFound.error.js";
import teamRepository from "../../../repository/team.repository.js";

class PublicTeamService {
  async getAllTeams() {
    return teamRepository.findAll();
  }

  async getTeamById(id) {
    const team = await teamRepository.findById(id);

    if (!team) {
      throw new NotFoundError("Team not found");
    }

    return team;
  }
}

export default new PublicTeamService();

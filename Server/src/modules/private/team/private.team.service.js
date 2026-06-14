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

import BadRequestError from "../../../shared/error/badRequest.error.js";
import NotFoundError from "../../../shared/error/notFound.error.js";
import teamRepository from "../../../repository/team.repository.js";

class PrivateTeamService {
  async createTeam(data) {
    const existingTeam = await teamRepository.findByNameOrShortName(
      data.name,
      data.shortName,
    );

    if (existingTeam) {
      throw new BadRequestError(
        "Team with this name or short name already exists",
      );
    }

    return teamRepository.create(data);
  }

  async updateTeam(id, data) {
    const existingTeam = await teamRepository.findById(id);

    if (!existingTeam) {
      throw new NotFoundError("Team not found");
    }

    if (data.name || data.shortName) {
      const duplicateTeam = await teamRepository.findDuplicateForUpdate(
        id,
        data.name || existingTeam.name,
        data.shortName || existingTeam.shortName,
      );

      if (duplicateTeam) {
        throw new BadRequestError(
          "Team with this name or short name already exists",
        );
      }
    }

    return teamRepository.updateById(id, data);
  }

  async deleteTeam(id) {
    const team = await teamRepository.deleteById(id);

    if (!team) {
      throw new NotFoundError("Team not found");
    }

    return team;
  }
}

export default new PrivateTeamService();

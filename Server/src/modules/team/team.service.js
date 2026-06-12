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

import mongoose from "mongoose";
import BadRequest from "../../shared/error/badRequest.error.js";
import NotFound from "../../shared/error/notFound.error.js";
import teamRepository from "./team.repository.js";

class TeamService {
  validateObjectId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequest("Invalid team id");
    }
  }

  async createTeam(data) {
    const existingTeam = await teamRepository.findByNameOrShortName(
      data.name,
      data.shortName,
    );

    if (existingTeam) {
      throw new BadRequest("Team with this name or short name already exists");
    }

    return teamRepository.create(data);
  }

  async getAllTeams() {
    return teamRepository.findAll();
  }

  async getTeamById(id) {
    this.validateObjectId(id);

    const team = await teamRepository.findById(id);

    if (!team) {
      throw new NotFound("Team not found");
    }

    return team;
  }

  async updateTeam(id, data) {
    this.validateObjectId(id);

    const existingTeam = await teamRepository.findById(id);

    if (!existingTeam) {
      throw new NotFound("Team not found");
    }

    if (data.name || data.shortName) {
      const duplicateTeam = await teamRepository.findDuplicateForUpdate(
        id,
        data.name || existingTeam.name,
        data.shortName || existingTeam.shortName,
      );

      if (duplicateTeam) {
        throw new BadRequest("Team with this name or short name already exists");
      }
    }

    return teamRepository.updateById(id, data);
  }

  async deleteTeam(id) {
    this.validateObjectId(id);

    const team = await teamRepository.deleteById(id);

    if (!team) {
      throw new NotFound("Team not found");
    }

    return team;
  }
}

export default new TeamService();
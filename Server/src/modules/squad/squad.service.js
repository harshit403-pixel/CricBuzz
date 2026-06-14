/**
 * Squad Service
 *
 * Handles Squad Management business rules using Team.squadPlayers.
 *
 * Important:
 * - No separate Squad collection is used.
 * - Squad membership is stored directly inside the Team document.
 * - This service validates team/player existence and prevents duplicates.
 */

import BadRequest from "../../shared/error/badRequest.error.js";
import NotFound from "../../shared/error/notFound.error.js";

import teamRepository from "../team/team.repository.js";
import playerRepository from "../player/player.repository.js";

class SquadService {
  async getSquad(teamId) {
    const team = await teamRepository.findByIdWithSquad(teamId);

    if (!team) {
      throw new NotFound("Team not found");
    }

    return {
      teamId: team._id,
      teamName: team.name,
      shortName: team.shortName,
      squadPlayers: team.squadPlayers,
      squadCount: team.squadPlayers.length,
    };
  }

  async addPlayerToSquad(teamId, playerId, updatedBy) {
    const team = await teamRepository.findById(teamId);

    if (!team) {
      throw new NotFound("Team not found");
    }

    const player = await playerRepository.findById(playerId);

    if (!player) {
      throw new NotFound("Player not found");
    }

    const isPlayerAlreadyInSquad = team.squadPlayers.some(
      (squadPlayerId) => squadPlayerId.toString() === playerId,
    );

    if (isPlayerAlreadyInSquad) {
      throw new BadRequest("Player already exists in squad");
    }

    /**
     * $addToSet prevents duplicate player IDs at the database level.
     * Service-level duplicate check is still used to return a clean API message.
     */
    const updatedTeam = await teamRepository.addPlayerToSquad(
      teamId,
      playerId,
      updatedBy,
    );

    return {
      teamId: updatedTeam._id,
      teamName: updatedTeam.name,
      shortName: updatedTeam.shortName,
      squadPlayers: updatedTeam.squadPlayers,
      squadCount: updatedTeam.squadPlayers.length,
    };
  }

  async removePlayerFromSquad(teamId, playerId, updatedBy) {
    const team = await teamRepository.findById(teamId);

    if (!team) {
      throw new NotFound("Team not found");
    }

    const player = await playerRepository.findById(playerId);

    if (!player) {
      throw new NotFound("Player not found");
    }

    const isPlayerInSquad = team.squadPlayers.some(
      (squadPlayerId) => squadPlayerId.toString() === playerId,
    );

    if (!isPlayerInSquad) {
      throw new BadRequest("Player not found in squad");
    }

    /**
     * $pull removes the player ID from Team.squadPlayers.
     * The Team document remains active and only the squad array changes.
     */
    const updatedTeam = await teamRepository.removePlayerFromSquad(
      teamId,
      playerId,
      updatedBy,
    );

    return {
      teamId: updatedTeam._id,
      teamName: updatedTeam.name,
      shortName: updatedTeam.shortName,
      squadPlayers: updatedTeam.squadPlayers,
      squadCount: updatedTeam.squadPlayers.length,
    };
  }
}

export default new SquadService();
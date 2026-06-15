import matchRepository from "../../../repository/match.repository.js";
import MATCH_STATUS from "../../../shared/constant/match.constant.js";
import BadRequestError from "../../../shared/error/badRequest.error.js";
import NotFoundError from "../../../shared/error/notFound.error.js";
import seriesRepository from "../../../repository/series.repository.js";
import teamRepository from "../../../repository/team.repository.js";
import { getIO } from "../../../sockets/socketGateway.js";

class PrivateMatchService {
  async getMatchById(id) {
    const match = await matchRepository.findById(id);

    if (!match) {
      throw new NotFoundError("Match not found");
    }

    return match;
  }
  async updateMatch(id, dto, user) {
    const match = await this.getMatchById(id);

    // Guard: cannot modify COMPLETED match
    if (match.status === MATCH_STATUS.COMPLETED) {
      throw new BadRequestError("Cannot modify a completed match");
    }

    return await matchRepository.updateById(id, {
      ...dto,
      updateById: user?.id,
    });
  }

  async deleteMatch(id, updatedBy) {
    const match = await matchRepository.deleteById(id, updatedBy);

    if (!match) {
      throw new NotFoundError("match not found");
    }

    return match;
  }

  async createMatch(dto, user) {
    const { seriesId, team1: team1Id, team2: team2Id } = dto;

    // Guard: team1 !== team2
    if (team1Id === team2Id) {
      throw new BadRequestError("Team 1 and Team 2 cannot be the same");
    }

    // Guard: verify seriesId exists
    const series = await seriesRepository.findById(seriesId);
    if (!series) {
      throw new NotFoundError("Series not found");
    }

    // Guard: verify team1 exists and has >= 11 players
    const team1 = await teamRepository.findById(team1Id);
    if (!team1) {
      throw new NotFoundError("Team 1 not found");
    }

    if (!team1.squadPlayers || team1.squadPlayers.length < 11) {
      throw new BadRequestError(
        `Team 1 (${team1.name}) must have at least 11 players in its squad to play a match`,
      );
    }

    // Guard: verify team2 exists and has >= 11 players
    const team2 = await teamRepository.findById(team2Id);
    if (!team2) {
      throw new NotFoundError("Team 2 not found");
    }

    if (!team2.squadPlayers || team2.squadPlayers.length < 11) {
      throw new BadRequestError(
        `Team 2 (${team2.name}) must have at least 11 players in its squad to play a match`,
      );
    }

    return await matchRepository.create({ ...dto, createdBy: user?.id });
  }

  // State Machine -> sequence of the event is very important [UPCOMING → TOSS_COMPLETED → PLAYING_XI_SELECTED → LIVE → COMPLETED]
  async updateToss(id, tossData, user) {
    const match = await this.getMatchById(id);

    if (match.status !== MATCH_STATUS.UPCOMING) {
      throw new BadRequestError(
        `Cannot update toss. Match status is currently: ${match.status}`,
      );
    }

    const updateMatch = await matchRepository.updateById(id, {
      tossWinner: tossData.tossWinner,
      tossDecision: tossData.tossDecision,
      status: MATCH_STATUS.TOSS_COMPLETED,
      updateById: user?.id,
    });

    this.broadCastMatchUpdates("match.status_updates", updateMatch);

    return updateMatch;
  }

  async startMatch(id, user) {
    const match = await this.getMatchById(id);

    if (match.status !== MATCH_STATUS.PLAYING_XI_SELECTED) {
      throw new BadRequestError(
        `Cannot start match. Current status is ${match.status} but must be PLAYING_XI_SELECTED`,
      );
    }

    const updatedMatch = await matchRepository.updateById(id, {
      status: MATCH_STATUS.LIVE,
      updateById: user?.id,
    });

    this.broadCastMatchUpdates("match.status_updated", updatedMatch);

    return updatedMatch;
  }

  async completeMatch(id, completeData, user) {
    const match = await this.getMatchById(id);

    if (
      match.status !== MATCH_STATUS.LIVE &&
      match.status !== MATCH_STATUS.INNINGS_BREAK
    ) {
      throw new BadRequestError(
        `cannot complete match. Current status is ${match.status}, but must be LIVE or INNINGS_BREAK`,
      );
    }

    const updatedMatch = await matchRepository.updateById(id, {
      status: MATCH_STATUS.COMPLETED,
      winner: completeData.winner,
      result: completeData.result,
      updateById: user?.id,
    });

    this.broadCastMatchUpdates("match.status_updated", updatedMatch);

    return updatedMatch;
  }

  // Helper function to emit messages.
  broadCastMatchUpdates(eventName, matchData) {
    try {
      getIO().emit(eventName, matchData);
    } catch (error) {
      // Catch socket errors so the HTTP request itself doesn't crash if Socket.io fails
      console.error("Socket.io emit failed:", error.message);
    }
  }
}

export default new PrivateMatchService();


/**
 * Playing XI Service
 *
 * Handles the main Playing XI flow:
 * - checks match availability and current status
 * - validates both teams' selected XI
 * - saves Playing XI into the match document
 * - moves match status to PLAYING_XI_SELECTED
 */
import matchRepository from "../../../repository/match.repository.js";
import playingXiRepository from "../../../repository/playingXi.repository.js";
import teamRepository from "../../../repository/team.repository.js";

import MATCH_STATUS from "../../../shared/constant/match.constant.js";
import BadRequestError from "../../../shared/error/badRequest.error.js";
import NotFoundError from "../../../shared/error/notFound.error.js";
import { getIO } from "../../../sockets/socketGateway.js";

class PrivatePlayingXiService {
  async selectPlayingXi(matchId, dto, user) {
    const match = await matchRepository.findById(matchId);

    if (!match) {
      throw new NotFoundError("Match not found");
    }

    if (match.status !== MATCH_STATUS.TOSS_COMPLETED) {
      throw new BadRequestError(
        `Cannot select Playing XI. Match status is currently ${match.status}, but must be TOSS_COMPLETED`,
      );
    }

    const team1Id = this.getId(match.team1);
    const team2Id = this.getId(match.team2);

    const team1 = await teamRepository.findByIdWithSquad(team1Id);
    const team2 = await teamRepository.findByIdWithSquad(team2Id);

    if (!team1) {
      throw new NotFoundError("Team 1 not found");
    }

    if (!team2) {
      throw new NotFoundError("Team 2 not found");
    }

    this.validateTeamPlayingXi("Team 1", dto.team1, team1.squadPlayers);
    this.validateTeamPlayingXi("Team 2", dto.team2, team2.squadPlayers);

    const updatedMatch = await playingXiRepository.updatePlayingXi(
      matchId,
      {
        team1: dto.team1,
        team2: dto.team2,
      },
      user?._id || user?.id,
    );

    this.broadcastPlayingXiUpdate(updatedMatch);

    return updatedMatch;
  }

  validateTeamPlayingXi(teamLabel, playingXi, squadPlayers) {
    if (playingXi.length !== 11) {
      throw new BadRequestError(`${teamLabel} must have exactly 11 players`);
    }

    const selectedPlayerIds = playingXi.map((item) => item.player.toString());
    const uniquePlayerIds = new Set(selectedPlayerIds);

    if (uniquePlayerIds.size !== selectedPlayerIds.length) {
      throw new BadRequestError(`${teamLabel} Playing XI has duplicate players`);
    }

    const captainCount = playingXi.filter((item) => item.isCaptain).length;
    if (captainCount !== 1) {
      throw new BadRequestError(`${teamLabel} must have exactly 1 captain`);
    }

    const wicketKeeperCount = playingXi.filter(
      (item) => item.isWicketKeeper,
    ).length;

    if (wicketKeeperCount !== 1) {
      throw new BadRequestError(
        `${teamLabel} must have exactly 1 wicket keeper`,
      );
    }

    const squadPlayerIds = new Set(
      squadPlayers.map((player) => this.getId(player)),
    );

    const invalidPlayers = selectedPlayerIds.filter(
      (playerId) => !squadPlayerIds.has(playerId),
    );

    if (invalidPlayers.length > 0) {
      throw new BadRequestError(
        `${teamLabel} has players who are not part of the squad`,
      );
    }
  }

  getId(value) {
    return value?._id ? value._id.toString() : value.toString();
  }

  broadcastPlayingXiUpdate(matchData) {
    try {
      getIO().emit("playingXI.updated", matchData);
    } catch (error) {
      console.error("Socket.io emit failed:", error.message);
    }
  }
}

export default new PrivatePlayingXiService();
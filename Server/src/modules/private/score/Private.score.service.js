/**
 * Score Service
 *
 * Contains business rules for innings-level score creation and updates.
 *
 * Future socket hook:
 * - emit score.updated after successful create/update.
 */

import BadRequestError from "../../../shared/error/badRequest.error.js";
import NotFoundError from "../../../shared/error/notFound.error.js";
import scoreRepository from "../../../repository/score.repository.js";
import teamRepository from "../../../repository/team.repository.js";

class ScoreService {
  async ensureLiveMatch(matchId) {
    const match = await scoreRepository.findActiveMatchById(matchId);

    if (!match) {
      throw new NotFoundError("Match not found");
    }

    if (match.status !== "LIVE") {
      throw new BadRequestError("Score can only be updated for live matches");
    }

    return match;
  }

  async ensureBattingTeamExists(teamId) {
    const team = await teamRepository.findById(teamId);

    if (!team) {
      throw new NotFoundError("Batting team not found");
    }

    return team;
  }

  async createScore(data) {
    await this.ensureLiveMatch(data.matchId);
    await this.ensureBattingTeamExists(data.battingTeam);

    const existingScore = await scoreRepository.findByMatchAndInnings(
      data.matchId,
      data.innings,
    );

    if (existingScore) {
      throw new BadRequestError("Score already exists for this innings");
    }

    const score = await scoreRepository.create(data);

    // Future ready: emit score.updated socket event here.
    return score;
  }

  async updateScore(id, data) {
    const existingScore = await scoreRepository.findById(id);

    if (!existingScore) {
      throw new NotFoundError("Score not found");
    }

    const matchId = data.matchId || existingScore.matchId.toString();
    const battingTeam =
      data.battingTeam || existingScore.battingTeam.toString();
    const innings = data.innings || existingScore.innings;

    await this.ensureLiveMatch(matchId);
    await this.ensureBattingTeamExists(battingTeam);

    if (data.innings || data.matchId) {
      const duplicateScore = await scoreRepository.findByMatchAndInnings(
        matchId,
        innings,
      );

      if (duplicateScore && duplicateScore._id.toString() !== id) {
        throw new BadRequestError("Score already exists for this innings");
      }
    }

    const score = await scoreRepository.updateById(id, data);

    // Future ready: emit score.updated socket event here.
    return score;
  }

  async getScoresByMatchId(matchId) {
    await this.ensureLiveMatch(matchId);

    return scoreRepository.findByMatchId(matchId);
  }
}

export default new ScoreService();

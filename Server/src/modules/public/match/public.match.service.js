import matchRepository from "../../../repository/match.repository.js";
import scoreRepository from "../../../repository/score.repository.js";
import NotFoundError from "../../../shared/error/notFound.error.js";

class PublicMatchService {
  async getMatches(status) {
    return await matchRepository.findAll(status);
  }

  async getMatchById(id) {
    const match = await matchRepository.findById(id);
    if (!match) {
      throw new NotFoundError("Match not found");
    }

    return match;
  }

  async getMatchCenter(matchId) {
    const match = await this.getMatchById(matchId);

    const scores = await scoreRepository.findByMatchId(matchId);
    const liveScore =
      scores.find((s) => s.innings === match.currentInnings) || null;

    return {
      matchInfo: match,
      liveScore,
      playingXI: match.playingXI,
      result: match.result,
    };
  }

  // For scoreCard
  async getMatchScoreCard(matchId) {
    await this.getMatchById(matchId); // checks if it exists
    const scores = await scoreRepository.findByMatchId(matchId);

    return {
      innings1: scores.find((s) => s.innings === 1) || null,
      innings2: scores.find((s) => s.innings === 2) || null,
    };
  }
}

export default new PublicMatchService();

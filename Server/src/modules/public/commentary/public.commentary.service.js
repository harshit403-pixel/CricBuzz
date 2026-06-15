/**
 * Public Commentary Service
 *
 * Handles public match commentary timeline:
 * - checks match availability
 * - fetches non-deleted commentary
 * - returns events in match order
 */

import commentaryRepository from "../../../repository/commentary.repository.js";
import matchRepository from "../../../repository/match.repository.js";

import NotFoundError from "../../../shared/error/notFound.error.js";

class PublicCommentaryService {
  async getMatchCommentary(matchId) {
    const match = await matchRepository.findById(matchId);

    if (!match) {
      throw new NotFoundError("Match not found");
    }

    return await commentaryRepository.findByMatchId(matchId);
  }
}

export default new PublicCommentaryService();
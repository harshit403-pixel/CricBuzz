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
  async getMatchCommentary(matchId, page = 1, limit = 50) {
    const match = await matchRepository.findById(matchId);

    if (!match) {
      throw new NotFoundError("Match not found");
    }

    const { commentaries, total } =
      await commentaryRepository.findByMatchInPagination(matchId, page, limit);

    return {
      commentary: commentaries,
      pagination: {
        page,
        limit,
        total,
      },
    };
  }
}

export default new PublicCommentaryService();

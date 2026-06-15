import matchRepository from "../../../repository/match.repository.js";
import NotFoundError from "../../../shared/error/notFound.error.js";

class PublicMatchService {
  async getMatches() {
    return await matchRepository.findAll();
  }

  async getMatchById(id) {
    const match = await matchRepository.findById(id);
    if (!match) {
      throw new NotFoundError("Match not found");
    }

    return match;
  }
}

export default new PublicMatchService();

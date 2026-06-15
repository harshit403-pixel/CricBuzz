import matchRepository from "../../../repository/match.repository.js";
import MATCH_STATUS from "../../../shared/constant/match.constant.js";

const MAX_LIMIT = 10;

class PublicHomeService {
  async getHomeData() {
    const [liveMatches, upcomingMatches, recentMatches] = await Promise.all([
      matchRepository.findByStatuses(
        [MATCH_STATUS.LIVE, MATCH_STATUS.INNINGS_BREAK],
        MAX_LIMIT,
      ),

      matchRepository.findByStatus(MATCH_STATUS.UPCOMING, MAX_LIMIT),
      matchRepository.findByStatus(MATCH_STATUS.COMPLETED, MAX_LIMIT),
    ]);

    return { liveMatches, upcomingMatches, recentMatches };
  }
}

export default new PublicHomeService();

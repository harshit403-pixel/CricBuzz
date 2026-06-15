import matchModel from "../models/match.model.js";
import MATCH_STATUS from "../shared/constant/match.constant.js";

class PlayingXiRepository {
  async updatePlayingXi(matchId, playingXI, updatedBy) {
    const update = {
      playingXI,
      status: MATCH_STATUS.PLAYING_XI_SELECTED,
    };

    if (updatedBy) {
      update.updatedBy = updatedBy;
    }

    return await matchModel
      .findOneAndUpdate({ _id: matchId, isDeleted: false }, update, {
        new: true,
        runValidators: true,
      })
      .populate("seriesId team1 team2 tossWinner winner");
  }
}

export default new PlayingXiRepository();
import commentaryModel from "../models/commentary.model.js";

/**
 * Commentary Repository
 *
 * Handles commentary database operations for
 * private creation/deletion and public match timeline.
 */

class CommentaryRepository {
  async create(data) {
    return await commentaryModel.create(data);
  }

  async findByMatchId(matchId) {
    return await commentaryModel
      .find({ matchId, isDeleted: false })
      .sort({ innings: 1, over: 1, ball: 1, createdAt: 1 })
      .populate("battingTeam player createdBy");
  }

  async findById(id) {
    return await commentaryModel.findOne({ _id: id, isDeleted: false });
  }

  async softDeleteById(id, updatedBy) {
    const update = {
      isDeleted: true,
    };

    if (updatedBy) {
      update.updatedBy = updatedBy;
    }

    return await commentaryModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      update,
      { new: true },
    );
  }

  async findRecentByMatchId(matchId, limit = 12) {
    return await commentaryModel
      .find({ matchId, isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(limit);
  }
}

export default new CommentaryRepository();
import matchModel from "../models/match.model.js";

class MatchRepository {
  async create(data) {
    const match = await matchModel.create(data);

    return this.findById(match._id);
  }

  async findAll() {
    return await matchModel
      .find({ isDeleted: false })
      .populate("seriesId team1 team2")
      .sort({ createdAt: -1 });
  }

  async findById(id) {
    return await matchModel
      .findOne({ _id: id, isDeleted: false })
      .populate("seriesId team1 team2 tossWinner winner");
  }

  async updateById(id, data) {
    return await matchModel
      .findOneAndUpdate(
        {
          _id: id,
          isDeleted: false,
        },
        data,
        {
          new: true,
          runValidators: true,
        },
      )
      .populate("seriesId team1 team2");
  }

  async deleteById(id) {
    return await matchModel.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async existsBySeriesId(seriesId) {
    const count = await matchModel.countDocuments({
      seriesId,
      isDeleted: false,
    });

    return count > 0;
  }

  // Fetch matches filtered by a specific status (LIVE, UPCOMING, COMPLETED)
  async findByStatus(status, limit = 10) {
    return await matchModel
      .find({ status, isDeleted: false })
      .populate("seriesId team1 team2")
      .sort({ startTime: -1 })
      .limit(limit);
  }

  // Fetch matches filtered by multiple statuses ([LIVE, INNINGS_BREAK])
  async findByStatuses(statuses, limit = 10) {
    return await matchModel
      .find({ status: { $in: statuses }, isDeleted: false })
      .populate("seriesId team1 team2")
      .sort({ startTime: -1 })
      .limit(limit);
  }

  // fetch all matches in a series
  async findBySeriesId(seriesId) {
    return await matchModel
      .find({ seriesId, isDeleted: false })
      .populate("team1 team2 winner");
  }
}

export default new MatchRepository();

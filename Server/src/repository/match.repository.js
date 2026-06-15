import matchModel from "../models/match.model.js";

class MatchRepository {
  async create(data) {
    return await matchModel.create(data);
  }

  async findAll() {
    return await matchModel.find({ isDeleted: false }).sort({ createdAT: -1 });
  }

  async findById(id) {
    return await matchModel
      .findOne({ _id: id, isDeleted: false })
      .populate("seriesId team1 team2 tossWinner winner");
  }

  async updateById(id, data) {
    return await matchModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      data,
      { new: true, runValidators: true },
    );
  }

  async deleteById(id) {
    return await matchModel.findByIdAndDelete(
      id,
      {
        isDeleted: true,
        updateById,
      },
      { new: true },
    );
  }

  async existsBySeriesId(seriesId) {
    const count = await matchModel.countDocuments({
      seriesId,
      isDeleted: false,
    });

    return count > 0;
  }
}

export default new MatchRepository();

/**
 * Series Repository
 *
 * Handles direct database operations for the Series module.
 * Business rules stay in the service layer.
 */

import mongoose from "mongoose";
import Series from "./series.model.js";

class SeriesRepository {
  async create(data) {
    return Series.create(data);
  }

  async findAll() {
    return Series.find({ isDeleted: false }).sort({ createdAt: -1 });
  }

  async findById(id) {
    return Series.findOne({ _id: id, isDeleted: false });
  }

  async findByNameOrSeason(name, season) {
    return Series.findOne({
      isDeleted: false,
      $or: [{ name }, { season }],
    });
  }

  async findDuplicateForUpdate(id, name, season) {
    return Series.findOne({
      _id: { $ne: id },
      isDeleted: false,
      $or: [{ name }, { season }],
    });
  }

  async hasActiveMatches(seriesId) {
    const db = mongoose.connection.db;

    if (!db) {
      return false;
    }

    const collections = await db
      .listCollections({ name: "matches" })
      .toArray();

    if (!collections.length) {
      return false;
    }

    const matchCount = await db.collection("matches").countDocuments({
      seriesId: new mongoose.Types.ObjectId(seriesId),
      isDeleted: { $ne: true },
    });

    return matchCount > 0;
  }

  async updateById(id, data) {
    return Series.findOneAndUpdate(
      { _id: id, isDeleted: false },
      data,
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async deleteById(id) {
    return Series.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      {
        new: true,
        runValidators: true,
      },
    );
  }
}

export default new SeriesRepository();

/**
 * Score Repository
 *
 * Handles direct database operations for innings-level scores.
 */

import mongoose from "mongoose";
import Score from "../models/score.model.js";

class ScoreRepository {
  async create(data) {
    return Score.create(data);
  }

  async findById(id) {
    return Score.findById(id);
  }

  async findByMatchId(matchId) {
    return Score.find({ matchId }).sort({ innings: 1 });
  }

  async findByMatchAndInnings(matchId, innings) {
    return Score.findOne({ matchId, innings });
  }

  async updateById(id, data) {
    return Score.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async findActiveMatchById(matchId) {
    const db = mongoose.connection.db;

    if (!db) {
      return null;
    }

    const collections = await db.listCollections({ name: "matches" }).toArray();

    if (!collections.length) {
      return null;
    }

    return db.collection("matches").findOne({
      _id: new mongoose.Types.ObjectId(matchId),
      isDeleted: { $ne: true },
    });
  }
}

export default new ScoreRepository();

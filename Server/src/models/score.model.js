/**
 * Score Model
 *
 * Stores innings-level score data for a live cricket match.
 */

import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },

    innings: {
      type: Number,
      enum: [1, 2],
      required: true,
    },

    battingTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    score: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    wickets: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
      default: 0,
    },

    overs: {
      type: String,
      required: true,
      match: [/^\d+(\.[0-5])?$/, "Overs must be in a valid format"],
      default: "0.0",
    },

    runRate: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    target: {
      type: Number,
      min: 0,
      default: null,
    },
  },
  { timestamps: true },
);

scoreSchema.index({ matchId: 1, innings: 1 }, { unique: true });

const Score = mongoose.model("Score", scoreSchema);

export default Score;

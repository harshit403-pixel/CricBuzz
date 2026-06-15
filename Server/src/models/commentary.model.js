import mongoose from "mongoose";

import COMMENTARY_TYPE from "../shared/constant/commentary.constant.js";

/**
 * Commentary Model
 *
 * Stores match commentary entries with event type,
 * so the frontend can build a live timeline from it.
 */

const commentarySchema = new mongoose.Schema(
  {
    matchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
      index: true,
    },

    innings: {
      type: Number,
      required: true,
      min: 1,
    },

    over: {
      type: Number,
      required: true,
      min: 0,
    },

    ball: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
    },

    battingTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },

    type: {
      type: String,
      enum: Object.values(COMMENTARY_TYPE),
      default: COMMENTARY_TYPE.NORMAL,
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    runs: {
      type: Number,
      default: 0,
      min: 0,
    },

    wicket: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

commentarySchema.index({
  matchId: 1,
  innings: 1,
  over: 1,
  ball: 1,
  createdAt: 1,
  isDeleted: 1,
});

const commentaryModel = mongoose.model("Commentary", commentarySchema);

export default commentaryModel;
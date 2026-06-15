import mongoose from "mongoose";
import MATCH_STATUS from "../shared/constant/match.constant.js";

const playingPlayerSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },

    isCaptain: {
      type: Boolean,
      default: false,
    },

    isWicketKeeper: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const matchSchema = new mongoose.Schema(
  {
    seriesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Series",
      required: true,
    },

    matchNumber: {
      type: String,
    },

    venue: {
      type: String,
      required: true,
      trim: true,
    },

    startTime: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(MATCH_STATUS),
      default: MATCH_STATUS.UPCOMING,
    },

    team1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    team2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    tossWinner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },

    tossDecision: {
      type: String,
      enum: ["BAT", "BOWL"],
    },

    playingXI: {
      team1: {
        type: [playingPlayerSchema],
        default: [],
      },
      team2: {
        type: [playingPlayerSchema],
        default: [],
      },
    },

    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },

    result: {
      type: String,
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

matchSchema.index({ status: 1, startTime: 1, isDeleted: 1 });
matchSchema.index({ seriesId: 1, startTime: 1, isDeleted: 1 });
matchSchema.index({ team1: 1, startTime: -1, isDeleted: 1 });
matchSchema.index({ team2: 1, startTime: -1, isDeleted: 1 });

// Ensures a team doesn't play against itself
matchSchema.pre("validate", function () {
  if (this.team1.toString() === this.team2.toString()) {
    throw new Error("Team 1 and Team 2 cannot be the same");
  }
});

const matchModel = mongoose.model("Match", matchSchema);

export default matchModel;

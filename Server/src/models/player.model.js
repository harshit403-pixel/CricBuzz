import mongoose from "mongoose";
import PLAYER_ROLES from "../shared/constant/player.constant.js";

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      trim: true,
      default: "",
    },

    role: {
      type: String,
      enum: Object.values(PLAYER_ROLES),
      required: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    battingStyle: {
      type: String,
      trim: true,
      default: "",
    },

    bowlingStyle: {
      type: String,
      trim: true,
      default: "",
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
  {
    timestamps: true,
  },
);

playerSchema.index(
  {
    name: 1,
    country: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  },
);

const playerModel = mongoose.model("Player", playerSchema);

export default playerModel;

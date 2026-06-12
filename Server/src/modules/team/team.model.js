/**
 * Team Model
 *
 * Defines the MongoDB schema for cricket teams.
 * The Team entity is used across matches, players, squads,
 * playing XI selection, scorecards, and points table features.
 *
 * This file should only contain schema-level rules and model export.
 */

import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    shortName: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },
    country: {
      type: String,
      trim: true,
      default: "",
    },
    logo: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Team = mongoose.model("Team", teamSchema);

export default Team;
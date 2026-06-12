/**
 * Team Model
 *
 * Defines the MongoDB schema for cricket teams.
 *
 * This schema follows the shared Cricbuzz Models document and keeps
 * Team as a reusable entity for matches, squads, playing XI, scores,
 * and points table features.
 *
 * Schema responsibilities:
 * - Define Team fields and data types.
 * - Define MongoDB references.
 * - Define default values.
 * - Keep soft-delete and audit fields available for admin operations.
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
      unique: true,
    },

    logo: {
      type: String,
      required: true,
    },

    primaryColor: {
      type: String,
    },

    squadPlayers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
      },
    ],

    /**
     * Soft delete flag.
     *
     * Records are not removed permanently from the database.
     * Instead, APIs should ignore records where isDeleted is true.
     */
    isDeleted: {
      type: Boolean,
      default: false,
    },

    /**
     * Audit fields.
     *
     * These will be useful once authentication/RBAC is connected.
     * For now, they stay optional because Team APIs are not yet using auth.
     */
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

const Team = mongoose.model("Team", teamSchema);

export default Team;
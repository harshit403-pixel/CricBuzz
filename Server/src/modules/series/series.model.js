/**
 * Series Model
 *
 * Defines the MongoDB schema for cricket series.
 *
 * Series is the tournament/container entity used by match, points table,
 * and public listing features. It follows the shared project convention of
 * soft-delete support, audit fields, and timestamp metadata.
 */

import mongoose from "mongoose";

const { Schema } = mongoose;

const seriesSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    shortName: { type: String, required: true, trim: true },
    season: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["UPCOMING", "LIVE", "COMPLETED"],
      default: "UPCOMING",
    },
    logo: String,
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

seriesSchema.index(
  { name: 1 },
  { unique: true, partialFilterExpression: { isDeleted: false } },
);

seriesSchema.index(
  { shortName: 1 },
  { unique: true, partialFilterExpression: { isDeleted: false } },
);

seriesSchema.index(
  { season: 1 },
  { unique: true, partialFilterExpression: { isDeleted: false } },
);

const Series = mongoose.model("Series", seriesSchema);

export default Series;
/**
 * Public Commentary Routes
 *
 * Handles public endpoint for fetching
 * match commentary timeline.
 */

import { Router } from "express";

import publicCommentaryController from "./public.commentary.controller.js";

const router = Router();

router.route("/matches/:id/commentary").get(
  publicCommentaryController.getMatchCommentary,
);

export default router; 
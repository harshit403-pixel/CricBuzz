/**
 * Commentary Service
 *
 * Handles commentary creation flow:
 * - checks match availability
 * - allows commentary only for LIVE matches
 * - saves typed commentary event
 * - emits timeline update event
 */

import commentaryRepository from "../../../repository/commentary.repository.js";
import matchRepository from "../../../repository/match.repository.js";

import MATCH_STATUS from "../../../shared/constant/match.constant.js";
import BadRequestError from "../../../shared/error/badRequest.error.js";
import NotFoundError from "../../../shared/error/notFound.error.js";
import { getIO } from "../../../sockets/socketGateway.js";

class PrivateCommentaryService {
  async createCommentary(dto, user) {
    const match = await matchRepository.findById(dto.matchId);

    if (!match) {
      throw new NotFoundError("Match not found");
    }

    if (match.status !== MATCH_STATUS.LIVE) {
      throw new BadRequestError(
        `Cannot add commentary. Match status is currently ${match.status}, but must be LIVE`,
      );
    }

    const commentary = await commentaryRepository.create({
      ...dto,
      createdBy: user?._id || user?.id,
    });

    this.broadcastCommentaryCreated(commentary);

    return commentary;
  }

  async deleteCommentary(commentaryId, user) {
    const commentary = await commentaryRepository.softDeleteById(
      commentaryId,
      user?._id || user?.id,
    );

    if (!commentary) {
      throw new NotFoundError("Commentary not found");
    }

    this.broadcastCommentaryDeleted(commentary);

    return commentary;
  }

  broadcastCommentaryCreated(commentary) {
    try {
      getIO().emit("commentary.created", {
        commentary,
        matchId: commentary.matchId,
      });
    } catch (error) {
      console.error("Socket.io emit failed:", error.message);
    }
  }

  broadcastCommentaryDeleted(commentary) {
    try {
      getIO().emit("commentary.deleted", {
        commentaryId: commentary._id,
        matchId: commentary.matchId,
      });
    } catch (error) {
      console.error("Socket.io emit failed:", error.message);
    }
  }
}

export default new PrivateCommentaryService();
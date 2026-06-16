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
import { emitToMatch } from "../../../sockets/socketGateway.js";

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

    this.broadcastCommentaryCreated(commentary.matchId, commentary);

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

    this.broadcastCommentaryDeleted(commentary.matchId, commentary._id);

    return commentary;
  }

  broadcastCommentaryCreated(matchId, commentary) {
    emitToMatch(matchId, "commentary.created", { matchId, commentary });
  }

  broadcastCommentaryDeleted(matchId, commentaryId) {
    emitToMatch(matchId, "commentary.deleted", {
      matchId,
      commentaryId: commentaryId,
    });
  }
}

export default new PrivateCommentaryService();

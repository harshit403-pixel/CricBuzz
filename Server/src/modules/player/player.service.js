import mongoose from "mongoose";

import BadRequest from "../../shared/error/badRequest.error.js";
import NotFound from "../../shared/error/notFound.error.js";

import playerRepository from "./player.repository.js";

class PlayerService {
  validateObjectId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequest("Invalid player id");
    }
  }

  async createPlayer(data) {
    const existingPlayer =
      await playerRepository.findByNameAndCountry(
        data.name,
        data.country,
      );

    if (existingPlayer) {
      throw new BadRequest(
        "Player with this name already exists in this country",
      );
    }

    return await playerRepository.create(data);
  }

  async getAllPlayers() {
    return await playerRepository.findAll();
  }

  async getPlayerById(id) {
    this.validateObjectId(id);

    const player = await playerRepository.findById(id);

    if (!player) {
      throw new NotFound("Player not found");
    }

    return player;
  }

  async updatePlayer(id, data) {
    this.validateObjectId(id);

    const duplicatePlayer =
      await playerRepository.findDuplicateForUpdate(
        id,
        data.name,
        data.country,
      );

    if (duplicatePlayer) {
      throw new BadRequest(
        "Player with this name already exists in this country",
      );
    }

    const player = await playerRepository.updateById(
      id,
      data,
    );

    if (!player) {
      throw new NotFound("Player not found");
    }

    return player;
  }

  async deletePlayer(id, updatedBy) {
    this.validateObjectId(id);

    const player =
      await playerRepository.deleteById(
        id,
        updatedBy,
      );

    if (!player) {
      throw new NotFound("Player not found");
    }

    return player;
  }
}

export default new PlayerService();
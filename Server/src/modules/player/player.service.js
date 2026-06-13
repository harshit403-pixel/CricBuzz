import BadRequest from "../../shared/error/badRequest.error.js";
import NotFound from "../../shared/error/notFound.error.js";

import playerRepository from "./player.repository.js";

class PlayerService {
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
    const player = await playerRepository.findById(id);

    if (!player) {
      throw new NotFound("Player not found");
    }

    return player;
  }

  async updatePlayer(id, data) {
    const existingPlayer =
      await playerRepository.findById(id);

    if (!existingPlayer) {
      throw new NotFound("Player not found");
    }

    const duplicatePlayer =
      await playerRepository.findDuplicateForUpdate(
        id,
        data.name || existingPlayer.name,
        data.country || existingPlayer.country,
      );

    if (duplicatePlayer) {
      throw new BadRequest(
        "Player with this name already exists in this country",
      );
    }

    return await playerRepository.updateById(
      id,
      data,
    );
  }

  async deletePlayer(id, updatedBy) {
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
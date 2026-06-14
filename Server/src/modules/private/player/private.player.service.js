import BadRequestError from "../../../shared/error/badRequest.error.js";
import NotFoundError from "../../../shared/error/notFound.error.js";
import playerRepository from "../../../repository/player.repository.js";

class PrivatePlayerService {
  async createPlayer(data) {
    const existingPlayer = await playerRepository.findByNameAndCountry(
      data.name,
      data.country,
    );

    if (existingPlayer) {
      throw new BadRequestError(
        "Player with this name already exists in this country",
      );
    }

    return await playerRepository.create(data);
  }

  async updatePlayer(id, data) {
    const existingPlayer = await playerRepository.findById(id);

    if (!existingPlayer) {
      throw new NotFoundError("Player not found");
    }

    const duplicatePlayer = await playerRepository.findDuplicateForUpdate(
      id,
      data.name || existingPlayer.name,
      data.country || existingPlayer.country,
    );

    if (duplicatePlayer) {
      throw new BadRequestError(
        "Player with this name already exists in this country",
      );
    }

    return await playerRepository.updateById(id, data);
  }

  async deletePlayer(id, updatedBy) {
    const player = await playerRepository.deleteById(id, updatedBy);

    if (!player) {
      throw new NotFoundError("Player not found");
    }

    return player;
  }
}

export default new PrivatePlayerService();

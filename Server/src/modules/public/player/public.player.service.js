import NotFound from "../../../shared/error/notFound.error.js";
import playerRepository from "../../../repository/player.repository.js";

class PublicPlayerService {
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
}

export default new PublicPlayerService();

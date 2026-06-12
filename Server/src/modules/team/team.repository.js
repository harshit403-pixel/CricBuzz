/**
 * Team Repository
 *
 * Handles direct database operations for the Team module.
 * This layer should only interact with the Team model and MongoDB.
 *
 * Business rules such as duplicate checks and not-found handling
 * should stay inside the service layer.
 */
import Team from "./team.model.js";

class TeamRepository {
  async create(data) {
    return Team.create(data);
  }

  async findAll() {
    return Team.find({}).sort({ createdAt: -1 });
  }

  async findById(id) {
    return Team.findById(id);
  }

  async findByNameOrShortName(name, shortName) {
    return Team.findOne({
      $or: [{ name }, { shortName }],
    });
  }

  async updateById(id, data) {
    return Team.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id) {
    return Team.findByIdAndDelete(id);
  }
}

export default new TeamRepository();
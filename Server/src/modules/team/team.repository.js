/**
 * Team Repository
 *
 * Handles direct database operations for the Team module.
 *
 * Repository responsibilities:
 * - Query the Team collection.
 * - Apply reusable database filters.
 * - Keep MongoDB/Mongoose logic separate from business logic.
 *
 * Business rules such as duplicate validation and not-found handling
 * should stay inside the service layer.
 */

import Team from "./team.model.js";

class TeamRepository {
  async create(data) {
    return Team.create(data);
  }

  async findAll() {
    return Team.find({ isDeleted: false }).sort({ createdAt: -1 });
  }

  async findById(id) {
    return Team.findOne({ _id: id, isDeleted: false });
  }

  async findByNameOrShortName(name, shortName) {
  return Team.findOne({
    $or: [{ name }, { shortName }],
  });
}

async findDuplicateForUpdate(id, name, shortName) {
  return Team.findOne({
    _id: { $ne: id },
    $or: [{ name }, { shortName }],
  });
}

  async updateById(id, data) {
    return Team.findOneAndUpdate(
      { _id: id, isDeleted: false },
      data,
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async deleteById(id) {
    return Team.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      {
        new: true,
        runValidators: true,
      },
    );
  }
}

export default new TeamRepository();
import playerModel from "../models/player.model.js";

class PlayerRepository {
  async create(data) {
    return await playerModel.create(data);
  }

  async findAll() {
    return await playerModel.find({ isDeleted: false }).sort({ createdAt: -1 });
  }

  async findById(id) {
    return await playerModel.findOne({
      _id: id,
      isDeleted: false,
    });
  }

  async findByNameAndCountry(name, country) {
    return await playerModel.findOne({
      name,
      country,
      isDeleted: false,
    });
  }

  async findDuplicateForUpdate(id, name, country) {
    return await playerModel.findOne({
      _id: { $ne: id },
      name,
      country,
      isDeleted: false,
    });
  }

  async updateById(id, data) {
    return await playerModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id, updatedBy) {
    return await playerModel.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        updatedBy,
      },
      {
        new: true,
      },
    );
  }
}

export default new PlayerRepository();

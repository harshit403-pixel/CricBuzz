import userModel from "./user.model.js";

class UserRepository {
  async create(data) {
    return await userModel.create(data);
  }

  async findById(id) {
  return await userModel.findOne({
    _id: id,
    isDeleted: false,
  }).select("-password");
}

  async findByEmail(email) {
    return await userModel.findOne({ email, isDeleted: false });
  }

  async findByGoogleId(googleId) {
    return await userModel.findOne({ googleId, isDeleted: false });
  }

  async findAll() {
    return await userModel.find({ isDeleted: false }).select("-password");
  }

  async updateById(id, data) {
    return await userModel
      .findByIdAndUpdate(id, data, { new: true })
      .select("-password");
  }
}

export default new UserRepository();

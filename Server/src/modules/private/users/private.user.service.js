import userRepository from "../../../repository/user.repository.js";
import NotFoundError from "../../../shared/error/notFound.error.js";

class PrivateUserService {
  async getUsers() {
    return await userRepository.findAll();
  }

  async updateRole(id, role) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return await userRepository.updateById(id, {
      role,
    });
  }

  async getUserById(id) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }
}

export default new PrivateUserService();

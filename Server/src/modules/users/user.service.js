import userRepository from "./user.repository.js";
import NotFoundError from "../../shared/error/notFound.error.js";

class UserService {
  async getUsers() {
    return await userRepository.findAll();
  }

  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }
}

export default new UserService();

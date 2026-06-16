import BadRequestError from "../../../shared/error/badRequest.error.js";
import Player from "../../../models/player.model.js";
import Team from "../../../models/team.model.js";
import Series from "../../../models/series.model.js";

class PublicSeachService {
  async search(query) {
    if (!query || query.trim().length < 2) {
      throw new BadRequestError("Search query must be at least 2 characters");
    }

    // Escape regex special characters from user input
    // Example: "India+" becomes "India\+"
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Case-insensitive partial match
    const regex = new RegExp(escaped, "i");

    const [players, teams, series] = await Promise.all([
      Player.find({ name: regex, isDeleted: false }).limit(10),
      Team.find({
        $or: [{ name: regex }, { shortName: regex }],
        isDeleted: false,
      }).limit(10),
      Series.find({
        $or: [{ name: regex }, { shortName: regex }],
        isDeleted: false,
      }).limit(10),
    ]);

    return { players, teams, series };
  }
}

export default new PublicSeachService();

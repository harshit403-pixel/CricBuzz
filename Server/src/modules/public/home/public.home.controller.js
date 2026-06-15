import publicHomeService from "./public.home.service.js";
import sendResponse from "../../../shared/utils/sendResponse.js";
import { StatusCodes } from "http-status-codes";

class PublicHomeController {
  async getHomeFeed(req, res) {
    const data = await publicHomeService.getHomeData();

    sendResponse(res, StatusCodes.OK, "Home feed retrived successfully", data);
  }
}

export default new PublicHomeController();

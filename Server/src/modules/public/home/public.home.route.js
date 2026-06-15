import { Router } from "express";
import publicHomeController from "./public.home.controller.js";

const router = Router();

router
  .route("/")
  .get(publicHomeController.getHomeFeed.bind(publicHomeController));

export default router;

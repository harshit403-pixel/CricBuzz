import { Router } from "express";
import publicSearchController from "./public.search.controller.js";

const router = Router();

router.route("/").get(publicSearchController.search);

export default router;
